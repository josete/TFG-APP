import React from 'react';
import Navbar from '../navbar/Navbar';
import Tablero from '../juego/Tablero'
import TableroPreguntas from '../juego/TableroPreguntas'
import Pregunta from '../juego/Pregunta'
import $ from "jquery";
import swal from 'sweetalert';
import { Button } from 'semantic-ui-react'
class Juego extends React.Component {
    state = { bloque: undefined, respuesta: undefined }
    handleItemClick = (e, { name }) => {
        var state = this.state;
        var contexto = this;
        switch (name) {
            case "Salir":
                var url = "http://" + window.location.host;
                localStorage.removeItem("token");
                window.location = url;
                break;
            case "Perfil":
                var url = "http://" + window.location.host + "/dashboard";
                window.location = url;
                break;
            case "Inicio":
                var url = "http://" + window.location.host;
                window.location = url;
                break;
            case "Juegos":
                var url = "http://" + window.location.host + "/juegos";
                window.location = url;
                break;
            case "Ver bloques":
                $(".bloque").removeClass("visible");
                $(".bloque").addClass("oculto");
                $(".tema").removeClass("visible");
                $(".tema").addClass("oculto");
                //ocultar boton volver a temas
                $("#botonBloques").removeClass("visible");
                $("#botonBloques").addClass("oculto");
                //Ocultar tablero bloques
                $("#tableroBloques").addClass("visible");
                $("#tableroBloques").removeClass("oculto");
                //Resetear state
                state.bloque = undefined;
                this.setState(state);
                break;
            case "Ver temas":
                //Ocultar preguntas
                $(".tema").removeClass("visible");
                $(".tema").addClass("oculto");
                //Mostar temas
                $("#Bloque-" + state.bloque).removeClass("oculto");
                $("#Bloque-" + state.bloque).addClass("visible");
                //Ocultar boton jugar
                $("#botonJugar").addClass("oculto");
                $("#botonJugar").removeClass("visible");
                //Ocultar boton ver temas
                $("#botonTemas").addClass("oculto");
                $("#botonTemas").removeClass("visible");
                //Mostar boton ver bloques
                $("#botonBloques").removeClass("oculto");
                $("#botonBloques").addClass("visible");
                break;
            case "Continuar jugando":
                //Obtencion de datos necesarios
                var direccionPartes = window.location.toString().split("/");
                var id = direccionPartes[direccionPartes.length - 1];
                var pregunta = $.ajax({
                    url: "http://localhost:3001/pregunta/siguiente/" + id,
                    type: "GET",
                    crossDomain: true,
                    headers: { "Authorization": localStorage.getItem("token") },
                    async: false
                }).responseText;
                if (pregunta.replace("\"", "").replace("\"", "") != "Ya se ha acabado el juego") {
                    var preguntaObjeto = JSON.parse(pregunta).pregunta;
                    state.tipo = preguntaObjeto.tipo;
                    state.nivel = preguntaObjeto.nivel;
                    state.id_pregunta = preguntaObjeto.id;
                    this.setState(state);
                    //Mostrar pregunta
                    $("#preguntaDiv").removeClass("oculto");
                    $("#preguntaDiv").addClass("visible");
                    //Ocultar boton jugar
                    $("#botonJugar").addClass("oculto");
                    $("#botonJugar").removeClass("visible");
                    //Ocultar preguntas
                    $(".tema").removeClass("visible");
                    $(".tema").addClass("oculto");
                    //Ocultar boton ver temas
                    $("#botonTemas").addClass("oculto");
                    $("#botonTemas").removeClass("visible");
                } else {
                    swal(pregunta.replace("\"", "").replace("\"", ""), "", "success");
                }
                break;
            case "Corregir":
                var respuesta = state.respuesta;
                var direccionPartes = window.location.toString().split("/");
                var id = direccionPartes[direccionPartes.length - 1];
                $.ajax({
                    url: "http://localhost:3001/pregunta/correccion",
                    type: "POST",
                    crossDomain: true,
                    headers: { "Authorization": localStorage.getItem("token") },
                    data: { respuesta: respuesta, tipo: state.tipo, nivel: state.nivel, idPregunta: state.id_pregunta, id_partida: id },
                    dataType: "json"
                }).done(function (data) {
                    if (data == "Respuesta correcta") {
                        swal(data, "", "success").then(function () {
                            contexto.cambiarPregunta();
                            state.respuesta = undefined;
                            contexto.setState(state);
                        });
                    } else if (data == "Respuesta incorrecta") {
                        swal(data, "", "error").then(function () {
                            contexto.cambiarPregunta();
                            state.respuesta = undefined;
                            contexto.setState(state);
                        });
                    } else if (data == "Respuesta incorrecta,") {
                        var partes = data.split(",");
                        swal(partes[0], partes[1], "error").then(function () {
                            contexto.cambiarPregunta();
                            state.respuesta = undefined;
                            contexto.setState(state);
                        });
                    } else {
                        swal(data, "", "success");
                    }

                });
                break;
        }
    }
    onChange = (e, { name, value }) => {
        var state = this.state;
        if (name == "respuesta") {
            state.respuesta = value;
        }
        this.setState(state);
    }
    obtenerBloques() {
        var direccionPartes = window.location.toString().split("/");
        var id = direccionPartes[direccionPartes.length - 1];
        var idJuego = $.ajax({
            url: "http://localhost:3001/partida/"+id+"/info/juego/",
            type: "GET",
            crossDomain: true,
            headers: { "Authorization": localStorage.getItem("token") },
            async: false
        }).responseText;
        var bloques = $.ajax({
            url: "http://localhost:3001/juego/" + JSON.parse(idJuego).idJuego+"/bloque",
            type: "GET",
            crossDomain: true,
            headers: { "Authorization": localStorage.getItem("token") },
            async: false
        }).responseText;
        return JSON.parse(bloques);
    }
    obtenerTemas(bloques) {
        var temas = [];
        for (var i = 0; i < bloques.length; i++) {
            var temasBloque = $.ajax({
                url: "http://localhost:3001/juego/bloque/" + bloques[i].id+"/tema",
                type: "GET",
                crossDomain: true,
                headers: { "Authorization": localStorage.getItem("token") },
                async: false
            }).responseText;
            temas.push(JSON.parse(temasBloque).temas);
        }
        return temas;
    }
    obtenerPreguntas(temas) {
        var preguntas = [];
        for (var i = 0; i < temas.length; i++) {
            //Numero de preguntas de tipo problema
            var preguntasTema = $.ajax({
                url: "http://localhost:3001/juego/bloque/tema/" + temas[i][0].id+"/pregunta/problema/niveles",
                type: "GET",
                crossDomain: true,
                headers: { "Authorization": localStorage.getItem("token") },
                async: false
            }).responseText;
            var preguntasTema2 = $.ajax({
                url: "http://localhost:3001/juego/bloque/tema/" + temas[i][0].id+"/pregunta/test/niveles",
                type: "GET",
                crossDomain: true,
                headers: { "Authorization": localStorage.getItem("token") },
                async: false
            }).responseText;
            var niveles = JSON.parse(preguntasTema).niveles;
            var niveles2 = JSON.parse(preguntasTema2).niveles;
            var casillas = [];
            for (var j = 0; j < niveles2; j++) {
                var casilla = {};
                casilla.tipo = "Test";
                casilla.nivel = j + 1;
                casilla.id = temas[i][0].id;
                casillas.push(casilla);
            }
            for (var j = 0; j < niveles; j++) {
                var casilla = {};
                casilla.tipo = "Problema";
                casilla.nivel = j + 1;
                casillas.push(casilla);
            }
            preguntas.push(casillas);
        }
        return preguntas;
    }
    casillaClick = (e) => {
        var id = e.target.id;
        var partes = id.split("-");
        var state = this.state;
        switch (partes[0]) {
            case "b":
                if (partes[1] <= state.bloqueActual) {
                    //Mostrar temas correspondientes
                    $("#Bloque-" + partes[1]).removeClass("oculto");
                    $("#Bloque-" + partes[1]).addClass("visible");
                    //Mostar boton volver a temas
                    $("#botonBloques").removeClass("oculto");
                    $("#botonBloques").addClass("visible");
                    //Ocultar tablero bloques
                    $("#tableroBloques").removeClass("visible");
                    $("#tableroBloques").addClass("oculto");
                    state.bloque = partes[1];
                    this.setState(state);
                } else {
                    swal("Todavia no has desbloqueado este bloque", "", "warning");
                }
                break;
            case "t":
                //Ocultar temas
                $(".bloque").removeClass("visible");
                $(".bloque").addClass("oculto");
                //Mostrar preguntas correspondientes
                $("#Tema-" + partes[1]).removeClass("oculto");
                $("#Tema-" + partes[1]).addClass("visible");
                //Mostar boton jugar
                $("#botonJugar").addClass("visible");
                $("#botonJugar").removeClass("oculto");
                //Mostar boton volver a temas
                $("#botonTemas").removeClass("oculto");
                $("#botonTemas").addClass("visible");
                //Ocultar boton volver a bloques
                $("#botonBloques").removeClass("visible");
                $("#botonBloques").addClass("oculto");
                break;
        }
    }
    obtenerSiguientePregunta() {
        var direccionPartes = window.location.toString().split("/");
        var id = direccionPartes[direccionPartes.length - 1];
        var pregunta = $.ajax({
            url: "http://localhost:3001/pregunta/siguiente/" + id,
            type: "GET",
            crossDomain: true,
            headers: { "Authorization": localStorage.getItem("token") },
            async: false
        }).responseText;
        if (pregunta.replace("\"", "").replace("\"", "") != "Ya se ha acabado el juego") {
            var preguntaObjeto = JSON.parse(pregunta).pregunta;
            return preguntaObjeto;
        } else {
            var preguntaObjeto = {};
            preguntaObjeto.enunciado = "";
            return preguntaObjeto;
        }
    }
    ponerPosicionesEnTablero() {
        var direccionPartes = window.location.toString().split("/");
        var id = direccionPartes[direccionPartes.length - 1];
        //Tablero de bloques
        var posicionesBloques = $.ajax({
            url: "http://localhost:3001/partida/"+id+"/posicion/bloque/",
            type: "GET",
            crossDomain: true,
            headers: { "Authorization": localStorage.getItem("token") },
            async: false
        }).responseText;
        var posicionesBloquesObjeto = JSON.parse(posicionesBloques);
        for (var i = 0; i < posicionesBloquesObjeto.length; i++) {
            var segment = "<span class='ui gray large label'>" + posicionesBloquesObjeto[i].jugador + "</span>"
            $("#b-" + posicionesBloquesObjeto[i].bloque + " .nombres").append(segment);
        }
        //Temas
        var posicionesBloques = $.ajax({
            url: "http://localhost:3001/partida/"+id+"/posicion/tema/",
            type: "GET",
            crossDomain: true,
            headers: { "Authorization": localStorage.getItem("token") },
            async: false
        }).responseText;
        var posicionesBloquesObjeto = JSON.parse(posicionesBloques);
        for (var i = 0; i < posicionesBloquesObjeto.length; i++) {
            var segment = "<span class='ui gray large label'>" + posicionesBloquesObjeto[i].jugador + "</span>"
            $("#t-" + posicionesBloquesObjeto[i].tema + " .nombres").append(segment);
        }
        //Preguntas
        var posicionesBloques = $.ajax({
            url: "http://localhost:3001/partida/"+id+"/posicion/pregunta/",
            type: "GET",
            crossDomain: true,
            headers: { "Authorization": localStorage.getItem("token") },
            async: false
        }).responseText;
        var posicionesBloquesObjeto = JSON.parse(posicionesBloques);
        console.log(posicionesBloques);
        for (var i = 0; i < posicionesBloquesObjeto.length; i++) {
            var segment = "<span class='ui gray large label'>" + posicionesBloquesObjeto[i].jugador + "</span>"
            console.log(posicionesBloquesObjeto[i].tipo + "-" + posicionesBloquesObjeto[i].nivel);
            $("#" + posicionesBloquesObjeto[i].tipo + "-" + posicionesBloquesObjeto[i].nivel + "-" + posicionesBloquesObjeto[i].tema + " .nombres").append(segment);
        }

    }
    cambiarPregunta() {
        var preguntaNueva = this.obtenerSiguientePregunta();
        var state = this.state;
        state.tipo = preguntaNueva.tipo;
        state.nivel = preguntaNueva.nivel;
        state.id_pregunta = preguntaNueva.id;
        $("#enunciadoPregunta").text(preguntaNueva.enunciado);
        if (preguntaNueva.imagen != undefined) {
            $("#imagenPregunta").attr("src", "http://localhost:3001/imagen/pregunta/" + preguntaNueva.imagen);
        } else {
            $("#imagenPreguntaDiv").removeClass("visible");
            $("#imagenPreguntaDiv").addClass("oculto");
        }
        if (preguntaNueva.tipo == "test") {
            //Ocultar test
            $("#tipoTest").addClass("visible");
            $("#tipoTest").removeClass("oculto");
            //Mostart problema
            $("#tipoProblema").addClass("oculto");
            $("#tipoProblema").removeClass("visible");
            //Cambiar respuestas
            $("label[for='resA']").text(preguntaNueva.resA);
            $("label[for='resB']").text(preguntaNueva.resB);
            $("label[for='resC']").text(preguntaNueva.resC);
            $("label[for='resD']").text(preguntaNueva.resD);
        } else {
            //Ocultar test
            $("#tipoTest").addClass("oculto");
            $("#tipoTest").removeClass("visible");
            //Mostart problema
            $("#tipoProblema").addClass("visible");
            $("#tipoProblema").removeClass("oculto");
        }
        this.setState(state);
    }
    bloquearTableros() {
        var direccionPartes = window.location.toString().split("/");
        var id = direccionPartes[direccionPartes.length - 1];
        var state = this.state;
        var bloque = $.ajax({
            url: "http://localhost:3001/partida/"+id+"/info/bloque/",
            type: "GET",
            crossDomain: true,
            headers: { "Authorization": localStorage.getItem("token") },
            async: false
        }).responseText;
        var bloqueActual = JSON.parse(bloque).BloqueActual;
        state.bloqueActual = bloqueActual;
        this.setState(state);
    }
    componentDidMount() {
        this.ponerPosicionesEnTablero();
        this.bloquearTableros();
    }
    render() {
        var datos = this.obtenerBloques();
        var temas = this.obtenerTemas(datos.bloques);
        var preguntas = this.obtenerPreguntas(temas);
        var siguientePregunta = this.obtenerSiguientePregunta();
        //this.ponerPosicionesEnTablero();
        return (
            <div>
                <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link>
                <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css" />
                <Navbar clickHandler={this.handleItemClick} />
                <div class="juegosRecientes">
                    <Button fluid color="green" className="oculto" id="botonBloques" name="Ver bloques" onClick={this.handleItemClick}>Ver bloques</Button>
                    <Button fluid color="green" className="oculto" id="botonTemas" name="Ver temas" onClick={this.handleItemClick}>Ver temas</Button>
                    <Tablero datos={datos.bloques} id="tableroBloques" click={this.casillaClick} tipo="b" />
                    {temas.map(function (temasBloque) {
                        return <Tablero datos={temasBloque} click={this.casillaClick} id={"Bloque-" + temasBloque[0].Bloque_id} tipo="t" class="oculto bloque" />
                    }, this)}
                    {preguntas.map(function (preguntasTema) {
                        return <TableroPreguntas datos={preguntasTema} id={"Tema-" + preguntasTema[0].id} tipo="p" class="oculto tema" />
                    }, this)}
                    <Pregunta pregunta={siguientePregunta} state={this.state} change={this.onChange} click={this.handleItemClick} />
                    <Button fluid color="green" className="oculto" id="botonJugar" onClick={this.handleItemClick} name="Continuar jugando">Continuar jugando</Button>
                </div>
            </div>
        );
    }
}
export default Juego;