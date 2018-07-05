import React from 'react';
import { Form, Button, Header, Modal, Input, Icon, Label, Step, Segment } from 'semantic-ui-react'
import $ from "jquery";
import swal from 'sweetalert';
import FormularioPaso1 from './FormularioPaso1';
import FormularioPaso2 from './FormularioPaso2';
import FormularioPaso3 from './FormularioPaso3';
import FormularioPaso4 from './FormularioPaso4';
import Pasos from './Pasos';

class CrearJuegoModal extends React.Component {
    state = { nombreJuego: "", imagenJuego: undefined, paso: 1, nombreBloque: "", bloques: [], nombreTema: "", temas: [], posicionTema: undefined, iTema: undefined, jTema: undefined, preguntaEditari: undefined, preguntaEditarj: undefined, preguntasEditar: [], imagenPregunta: undefined };
    constructor() {
        super();
    }
    onChange = (e, { name, value }) => {
        if (name == "tipoPregunta") {
            this.setState({ "tipoPregunta": value });
            if (value == "test") {
                $("#campoRespuestaProblema").hide();
                $("#campoRespuestasTest").show();
            } else {
                $("#campoRespuestasTest").hide();
                $("#campoRespuestaProblema").show();
            }
        } else if (name == "resCorrectaTest") {
            this.setState({ "resCorrectaTest": value });
        } else if (name == "imagenJuego") {
            const state = this.state;
            var formData = new FormData();
            formData.append("imagen", e.target.files[0]);
            state[name] = formData;
            this.setState(state);
        } else if (name == "imagenPregunta") {
            const state = this.state;
            var formData = new FormData();
            formData.append("imagen", e.target.files[0]);
            state[name] = formData;
            this.setState(state);
        } else {
            const state = this.state;
            state[e.target.name] = e.target.value;
            this.setState(state);
        }
    }
    siguiente = (e) => {
        var props = this.props;
        function comprobar(state) {
            switch (state.paso) {
                case 1:
                    if (state.nombreJuego.length == 0) {
                        $("#campoNombreJuego").append("<div class='ui pointing red basic label' id='noNombreJuego'>El nombre del curso es necesario</div>");
                    } else {
                        $("#noNombreJuego").hide();
                        $("#1").removeClass("active");
                        $("#1").addClass("completed");
                        $("#2").addClass("active");
                        $("#formularioPaso1").hide();
                        $("#formularioPaso2").show();
                        state.paso = 2;
                        return state;
                    }
                    break;
                case 2:
                    if (state.bloques.length == 0) {
                        $("#campoNombreBloque").append("<div class='ui pointing red basic label' id='noBloques'>Al menos tiene que haber un bloque</div>");
                    } else {
                        $("#noBloques").hide();
                        $("#2").removeClass("active");
                        $("#2").addClass("completed");
                        $("#3").addClass("active");
                        $("#formularioPaso2").hide();
                        $("#formularioPaso3").show();
                        state.temas = new Array(state.bloques.length);
                        state.paso = 3;
                        return state;
                    }
                    break;
                case 3:
                    var n = 0;
                    for (var i = 0; i < state.temas.length; i++) {
                        if (state.temas[i] != undefined) {
                            n++;
                        }
                    }
                    if (n != state.bloques.length) {
                        $("#campoNombreTema").append("<div class='ui pointing red basic label' id='noTemas'>Al menos tiene que haber un tema por bloque</div>");
                        return state;
                    } else {
                        $("#noTemas").hide();
                        $("#3").removeClass("active");
                        $("#3").addClass("completed");
                        $("#4").addClass("active");
                        $("#formularioPaso3").hide();
                        $("#formularioPaso4").show();
                        var nTemas = 0;
                        for (var i = 0; i < state.temas.length; i++) {
                            if (state.temas[i] != undefined) {
                                for (var j = 0; j < state.temas[i].length; j++) {
                                    nTemas++;
                                }
                            }
                        }
                        state.nTemas = nTemas;
                        state.preguntas = new Array(nTemas);
                        state.paso = 4;
                        return state;
                    }
                    break;
                case 4:
                    $.ajax({
                        url: "http://localhost:3001/juego/",
                        type: "POST",
                        crossDomain: true,
                        headers: { "Authorization": localStorage.getItem("token") },
                        data: { nombre: state.nombreJuego },
                        dataType: "json"
                    }).done(function (data) {
                        if (state.imagenJuego != undefined) {
                            $.ajax({
                                url: "http://localhost:3001/imagen/juego/" + data.id,
                                type: "POST",
                                crossDomain: true,
                                headers: { "Authorization": localStorage.getItem("token") },
                                contentType: false,
                                processData: false,
                                data: state.imagenJuego
                            });
                        }
                        var idJuego = data.id;
                        var idsBloques = [];
                        for (var i = 0; i < state.bloques.length; i++) {
                            $.ajax({
                                url: "http://localhost:3001/juego/bloque/",
                                type: "POST",
                                crossDomain: true,
                                data: { idJuego: idJuego, nombre: state.bloques[i] },
                                dataType: "json",
                            }).done(function (data) {
                                idsBloques.push(data.id);
                                if (idsBloques.length == state.bloques.length) {
                                    var idsTemas = [];
                                    for (var i = 0; i < state.temas.length; i++) {
                                        for (var j = 0; j < state.temas[i].length; j++) {
                                            $.ajax({
                                                url: "http://localhost:3001/juego/bloque/tema/",
                                                type: "POST",
                                                crossDomain: true,
                                                data: { idBloque: idsBloques[i], nombre: state.temas[i][j] },
                                                dataType: "json",
                                            }).done(function (data) {
                                                idsTemas.push(data.id);
                                                if (idsTemas.length == state.nTemas) {
                                                    for (var i = 0; i < state.preguntas.length; i++) {
                                                        for (var j = 0; j < state.preguntas[i].length; j++) {
                                                            var imagen = state.preguntas[i][j].imagen;
                                                            var temp = state.preguntas[i][j];
                                                            delete temp["imagen"];
                                                            var idPregunta = $.ajax({
                                                                url: "http://localhost:3001/juego/bloque/tema/pregunta/",
                                                                type: "POST",
                                                                crossDomain: true,
                                                                headers: { "Authorization": localStorage.getItem("token") },
                                                                data: { idTema: idsTemas[i], pregunta: temp },
                                                                async: false
                                                            }).responseText;
                                                            var id_pregunta = JSON.parse(idPregunta).id;                                                            
                                                            if (imagen != undefined) {
                                                                $.ajax({
                                                                    url: "http://localhost:3001/imagen/pregunta/" + id_pregunta,
                                                                    type: "POST",
                                                                    crossDomain: true,
                                                                    headers: { "Authorization": localStorage.getItem("token") },
                                                                    contentType: false,
                                                                    processData: false,
                                                                    data: imagen
                                                                });
                                                            }
                                                            ////----------------------
                                                            /*$.ajax({
                                                                url: "http://localhost:3001/pregunta/",
                                                                type: "POST",
                                                                crossDomain: true,
                                                                data: { idTema: idsTemas[i], pregunta: temp },
                                                                dataType: "json",
                                                            }).done(function (data) {
                                                                if (state.preguntas[i][j].imagen != undefined) {
                                                                    $.ajax({
                                                                        url: "http://localhost:3001/pregunta/imagen/" + data['id'],
                                                                        type: "POST",
                                                                        crossDomain: true,
                                                                        headers: { "Authorization": localStorage.getItem("token") },
                                                                        contentType: false,
                                                                        processData: false,
                                                                        data: state.preguntas[i][j].imagen
                                                                    });
                                                                }
                                                                props.close();
                                                            });*/
                                                        }
                                                    }
                                                    props.close();
                                                }
                                            });
                                        }
                                    }
                                }
                            });
                        }
                    });
                    break;
            }
        }
        var state = comprobar(this.state);
        if (state != undefined) { this.setState(state) }
    }
    anadirBloque = (e) => {
        function comprobar(state) {
            if (state.nombreBloque.length == 0) {
                $("#campoNombreBloque").append("<div class='ui pointing red basic label' id='noNombreBloque'>El nombre del bloque es necesario</div>");
                return state;
            } else {
                $("#noNombreBloque").hide();
                $("#bloques").show();
                state.bloques.push(state.nombreBloque);
                var cuenta = state.bloques.length;
                var segment = "<div class='column'><span class='ui blue large label'>" + cuenta + ". " + state.nombreBloque + "</span></div>"
                state.nombreBloque = "";
                $("#nombreBloque").val("");
                $("#bloques").append(segment);
                return state;
            }
        }
        this.setState(comprobar(this.state));
    }
    anadirTema = (e) => {
        function comprobar(state) {
            if (state.nombreTema.length == 0) {
                $("#campoNombreTema").append("<div class='ui pointing red basic label' id='noNombreTema'>El nombre del tema es necesario</div>");
                $("#noTemaSeleccionado").hide();
                return state;
            } else if (state.posicionTema == undefined) {
                $("#noNombreTema").hide();
                $("#campoNombreTema").append("<div class='ui pointing red basic label' id='noTemaSeleccionado'>No has seleccionado ningún tema</div>");
                return state;
            } else {
                $("#noNombreTema").hide();
                $("#noTemaSeleccionado").hide();
                var temas = state.temas[state.posicionTema];
                if (temas != undefined) {
                    temas.push(state.nombreTema);
                } else {
                    temas = [];
                    temas.push(state.nombreTema);
                }
                state.temas[state.posicionTema] = temas;
                var cuenta = temas.length;
                var segment = "<div class='column'><span class='ui blue large label'>" + cuenta + ". " + state.nombreTema + "</span></div>"
                state.nombreTema = "";
                $("#nombreTema").val("");
                $("#temas").append(segment);
                return state;
            }
        }
        this.setState(comprobar(this.state));
    }
    seleccionarBloque = (e) => {
        function pintarTemas(state) {
            var temas = state.temas[state.posicionTema];
            if (temas != undefined) {
                for (var i = 0; i < temas.length; i++) {
                    var segment = "<div class='column'><span class='ui blue large label'>" + (i + 1) + ". " + temas[i] + "</span></div>";
                    $("#temas").append(segment);
                }
            }
        }
        var state = this.state;
        state.posicionTema = e.target.id.split("-")[1];
        $("#temas").empty();
        pintarTemas(state);
        $(".seleccionable").removeClass("red");
        $(".seleccionable").removeClass("blue");
        $(".seleccionable").addClass("blue");
        $("#" + e.target.id).removeClass("blue");
        $("#" + e.target.id).addClass("red");
        this.setState(state);
    }
    seleccionarTema = (e, data) => {
        var state = this.state;
        var posicion = data.value.split("-")[1];
        var i = posicion.split(".")[0];
        var j = posicion.split(".")[1];
        var state = this.state;
        state.iTema = i;
        state.jTema = j;
        this.setState(state);
    }
    seleccionarNivel = (e,data) => {
        var state = this.state;
        state.nivelPregunta = data.value;
        this.setState(state);
    }
    seleccionarPregunta = (e, data) => {
        var state = this.state;
        var posicion = data.value.split("-");
        var i = posicion[0];
        var j = posicion[1];
        state.preguntaEditari = i;
        state.preguntaEditarj = j;
        var pregunta = state.preguntas[i][j];
        state.tipoPregunta = pregunta.tipo;
        if (pregunta.tipo == "test") {
            $("#nivelPregunta").val(pregunta.nivel);
            $("#enunciadoPregunta").val(pregunta.enunciado);
            $("#RespuestaA").val(pregunta.resA);
            $("#RespuestaB").val(pregunta.resB);
            $("#RespuestaC").val(pregunta.resC);
            $("#RespuestaD").val(pregunta.resD);
            state.resCorrectaTest = pregunta.solucion;
            $("#campoRespuestaProblema").hide();
            $("#campoRespuestasTest").show();
            state.nivelPregunta = pregunta.nivel;
            state.tipoPregunta = pregunta.tipo;
            state.enunciadoPregunta = pregunta.enunciado;
            state.RespuestaA = pregunta.resA;
            state.RespuestaB = pregunta.resB;
            state.RespuestaC = pregunta.resC;
            state.RespuestaD = pregunta.resD;
            state.resCorrectaTest = pregunta.solucion;
        } else if (pregunta.tipo == "problema") {
            $("#nivelPregunta").val(pregunta.nivel);
            $("#enunciadoPregunta").val(pregunta.enunciado);
            $("#solucionProblema").val(pregunta.solucion);
            $("#correcionProblema").val(pregunta.correccion);
            $("#pistaProblema").val(pregunta.pista);
            $("#campoRespuestasTest").hide();
            $("#campoRespuestaProblema").show();
            state.nivelPregunta = pregunta.nivel;
            state.tipoPregunta = pregunta.tipo;
            state.enunciadoPregunta = pregunta.enunciado;
            state.solucionProblema = pregunta.solucion;
            state.pistaProblema = pregunta.pista;
            state.correcionProblema = pregunta.correccion;
        }
        //Cambia los botones
        $("#crearPregunta").hide();
        $("#editarPreguntasBotones").show();
        this.setState(state);
    }
    generarSelectPreguntas() {
        var state = this.state;
        var preguntas = [];
        for (var i = 0; i < state.temas.length; i++) {
            if (state.preguntas[i] != undefined) {
                for (var j = 0; j < state.preguntas[i].length; j++) {
                    var ob = {};
                    ob.value = i + "-" + j;
                    ob.text = state.preguntas[i][j].enunciado;
                    preguntas.push(ob);
                }
            }
        }
        state.preguntasEditar = preguntas;
        this.setState(state);
    }
    anadirPregunta = (e) => {
        function comprobar(state) {
            if (state.iTema == undefined || state.jTema == undefined) {
                swal("No has seleccionado ningun tema", "", "warning");
            } else if (state.nivelPregunta == undefined) {
                if ($('#noNivelPregunta').length == 0) {
                    $("#campoNivelPregunta").append("<div class='ui pointing red basic label' id='noNivelPregunta'>El nivel es necesario</div>");
                }
            } else if (state.tipoPregunta == undefined) {
                swal("No has seleccionado el tipo de pregunta", "", "warning");
            } else if (state.enunciadoPregunta == undefined) {
                swal("No hay enunciado", "", "warning");
            } else if (state.tipoPregunta == "test" && state.RespuestaA == undefined) {
                if ($('#noRespuestaA').length == 0) {
                    $("#campoRespuestasTest").append("<div class='ui pointing red basic label' id='noRespuestaA'>No hay respuesta A</div>");
                }
            } else if (state.tipoPregunta == "test" && state.RespuestaB == undefined) {
                if ($('#noRespuestaB').length == 0) {
                    $("#campoRespuestasTest").append("<div class='ui pointing red basic label' id='noRespuestaB'>No hay respuesta B</div>");
                }
            } else if (state.tipoPregunta == "test" && state.RespuestaC == undefined) {
                if ($('#noRespuestaC').length == 0) {
                    $("#campoRespuestasTest").append("<div class='ui pointing red basic label' id='noRespuestaC'>No hay respuesta C</div>");
                }
            } else if (state.tipoPregunta == "test" && state.RespuestaD == undefined) {
                if ($('#noRespuestaD').length == 0) {
                    $("#campoRespuestasTest").append("<div class='ui pointing red basic label' id='noRespuestaD'>No hay respuesta D</div>");
                }
            } else if (state.tipoPregunta == "test" && state.resCorrectaTest == undefined) {
                swal("No hay respuesta correcta", "", "warning");
            } else if (state.tipoPregunta == "problema" && state.solucionProblema == undefined) {
                if ($('#noSolucionProblema').length == 0) {
                    $("#campoRespuestaProblema").append("<div class='ui pointing red basic label' id='noSolucionProblema'>No hay solucion al problema</div>");
                }
            } else if (state.tipoPregunta == "problema" && state.correcionProblema == undefined) {
                if ($('#noCorrecionProblema').length == 0) {
                    $("#campoRespuestaProblema").append("<div class='ui pointing red basic label' id='noCorrecionProblema'>No hay correccion para el problema</div>");
                }
            } else if (state.tipoPregunta == "problema" && state.pistaProblema == undefined) {
                if ($('#noPistaProblema').length == 0) {
                    $("#campoRespuestaProblema").append("<div class='ui pointing red basic label' id='noPistaProblema'>No hay pista para el problema</div>");
                }
            } else {
                var pregunta = {};
                pregunta.nivel = state.nivelPregunta;
                pregunta.tipo = state.tipoPregunta;
                pregunta.enunciado = state.enunciadoPregunta;
                if (state.tipoPregunta == "test") {
                    pregunta.resA = state.RespuestaA;
                    pregunta.resB = state.RespuestaB;
                    pregunta.resC = state.RespuestaC;
                    pregunta.resD = state.RespuestaD;
                    pregunta.solucion = state.resCorrectaTest;
                } else if (state.tipoPregunta == "problema") {
                    pregunta.solucion = state.solucionProblema;
                    pregunta.pista = state.pistaProblema;
                    pregunta.correccion = state.correcionProblema;
                }
                if (state.imagenPregunta != undefined) {
                    pregunta.imagen = state.imagenPregunta;
                }
                var array = state.preguntas[state.iTema];
                if (array == undefined) {
                    array = [];
                    array.push(pregunta);
                } else {
                    array.push(pregunta);
                }
                state.preguntas[state.iTema] = array;
                //Resetear
                state.nivelPregunta = undefined;
                state.tipoPregunta = undefined;
                state.enunciadoPregunta = undefined;
                state.RespuestaA = undefined;
                state.RespuestaB = undefined;
                state.RespuestaC = undefined;
                state.RespuestaD = undefined;
                state.solucionProblema = undefined;
                state.pistaProblema = undefined;
                state.correcionProblema = undefined;
                state.resCorrectaTest = undefined;
                state.imagenPregunta = undefined;
                $("#nivelPregunta").val("");
                $("#enunciadoPregunta").val("");
                $("#RespuestaA").val("");
                $("#RespuestaB").val("");
                $("#RespuestaC").val("");
                $("#RespuestaD").val("");
                $("#solucionProblema").val("");
                $("#correcionProblema").val("");
                $("#pistaProblema").val("");
                $("#campoRespuestaProblema").hide();
                $("#campoRespuestasTest").hide();
                //$("imagenPregunta").val("");
                document.getElementById("imagenPregunta").value = "";
                return state;
            }
        }
        this.setState(comprobar(this.state));
        this.generarSelectPreguntas();
    }
    editarPregunta = (e) => {
        $("#crearPregunta").show();
        $("#editarPreguntasBotones").hide();
        function comprobar(state) {
            if (state.iTema == undefined || state.jTema == undefined) {
                swal("No has seleccionado ningun tema", "", "warning");
            } else if (state.nivelPregunta == undefined) {
                if ($('#noNivelPregunta').length == 0) {
                    $("#campoNivelPregunta").append("<div class='ui pointing red basic label' id='noNivelPregunta'>El nivel es necesario</div>");
                }
            } else if (state.tipoPregunta == undefined) {
                swal("No has seleccionado el tipo de pregunta", "", "warning");
            } else if (state.enunciadoPregunta == undefined) {
                swal("No hay enunciado", "", "warning");
            } else if (state.tipoPregunta == "test" && state.RespuestaA == undefined) {
                if ($('#noRespuestaA').length == 0) {
                    $("#campoRespuestasTest").append("<div class='ui pointing red basic label' id='noRespuestaA'>No hay respuesta A</div>");
                }
            } else if (state.tipoPregunta == "test" && state.RespuestaB == undefined) {
                if ($('#noRespuestaB').length == 0) {
                    $("#campoRespuestasTest").append("<div class='ui pointing red basic label' id='noRespuestaB'>No hay respuesta B</div>");
                }
            } else if (state.tipoPregunta == "test" && state.RespuestaC == undefined) {
                if ($('#noRespuestaC').length == 0) {
                    $("#campoRespuestasTest").append("<div class='ui pointing red basic label' id='noRespuestaC'>No hay respuesta C</div>");
                }
            } else if (state.tipoPregunta == "test" && state.RespuestaD == undefined) {
                if ($('#noRespuestaD').length == 0) {
                    $("#campoRespuestasTest").append("<div class='ui pointing red basic label' id='noRespuestaD'>No hay respuesta D</div>");
                }
            } else if (state.tipoPregunta == "test" && state.resCorrectaTest == undefined) {
                swal("No hay respuesta correcta", "", "warning");
            } else if (state.tipoPregunta == "problema" && state.solucionProblema == undefined) {
                if ($('#noSolucionProblema').length == 0) {
                    $("#campoRespuestaProblema").append("<div class='ui pointing red basic label' id='noSolucionProblema'>No hay solucion al problema</div>");
                }
            } else if (state.tipoPregunta == "problema" && state.correcionProblema == undefined) {
                if ($('#noCorrecionProblema').length == 0) {
                    $("#campoRespuestaProblema").append("<div class='ui pointing red basic label' id='noCorrecionProblema'>No hay correccion para el problema</div>");
                }
            } else if (state.tipoPregunta == "problema" && state.pistaProblema == undefined) {
                if ($('#noPistaProblema').length == 0) {
                    $("#campoRespuestaProblema").append("<div class='ui pointing red basic label' id='noPistaProblema'>No hay pista para el problema</div>");
                }
            } else {
                var pregunta = {};
                pregunta.nivel = state.nivelPregunta;
                pregunta.tipo = state.tipoPregunta;
                pregunta.enunciado = state.enunciadoPregunta;
                if (state.tipoPregunta == "test") {
                    pregunta.resA = state.RespuestaA;
                    pregunta.resB = state.RespuestaB;
                    pregunta.resC = state.RespuestaC;
                    pregunta.resD = state.RespuestaD;
                    pregunta.solucion = state.resCorrectaTest;
                } else if (state.tipoPregunta == "problema") {
                    pregunta.solucion = state.solucionProblema;
                    pregunta.pista = state.pistaProblema;
                    pregunta.correccion = state.correcionProblema;
                }
                state.preguntas[state.preguntaEditari][state.preguntaEditarj] = pregunta;
                //Si hay imagen añadirla
                //Resetear
                state.nivelPregunta = undefined;
                state.tipoPregunta = undefined;
                state.enunciadoPregunta = undefined;
                state.RespuestaA = undefined;
                state.RespuestaB = undefined;
                state.RespuestaC = undefined;
                state.RespuestaD = undefined;
                state.solucionProblema = undefined;
                state.pistaProblema = undefined;
                state.correcionProblema = undefined;
                state.resCorrectaTest = undefined;
                $("#nivelPregunta").val("");
                $("#enunciadoPregunta").val("");
                $("#RespuestaA").val("");
                $("#RespuestaB").val("");
                $("#RespuestaC").val("");
                $("#RespuestaD").val("");
                $("#solucionProblema").val("");
                $("#correcionProblema").val("");
                $("#pistaProblema").val("");
                $("#campoRespuestaProblema").hide();
                $("#campoRespuestasTest").hide();
                return state;
            }
        }
        this.setState(comprobar(this.state));
        this.generarSelectPreguntas();
    }
    cancelarEdicion = (e) => {
        $("#crearPregunta").show();
        $("#editarPreguntasBotones").hide();
        var state = this.state;
        state.nivelPregunta = undefined;
        state.tipoPregunta = undefined;
        state.enunciadoPregunta = undefined;
        state.RespuestaA = undefined;
        state.RespuestaB = undefined;
        state.RespuestaC = undefined;
        state.RespuestaD = undefined;
        state.solucionProblema = undefined;
        state.pistaProblema = undefined;
        state.correcionProblema = undefined;
        state.resCorrectaTest = undefined;
        $("#nivelPregunta").val("");
        $("#enunciadoPregunta").val("");
        $("#RespuestaA").val("");
        $("#RespuestaB").val("");
        $("#RespuestaC").val("");
        $("#RespuestaD").val("");
        $("#solucionProblema").val("");
        $("#correcionProblema").val("");
        $("#pistaProblema").val("");
        $("#campoRespuestaProblema").hide();
        $("#campoRespuestasTest").hide();
        this.setState(state);
    }
    close = (e) => {
        swal("¿Quieres salir sin guardar el juego?", {
            buttons: {
                cancel: "No",
                Si: true,
            },
        }).then((value) => {
            switch (value) {
                case "Si":
                    var state = this.state;
                    state.nivelPregunta = undefined;
                    state.tipoPregunta = undefined;
                    state.enunciadoPregunta = undefined;
                    state.RespuestaA = undefined;
                    state.RespuestaB = undefined;
                    state.RespuestaC = undefined;
                    state.RespuestaD = undefined;
                    state.solucionProblema = undefined;
                    state.pistaProblema = undefined;
                    state.correcionProblema = undefined;
                    state.resCorrectaTest = undefined;
                    state.nombreJuego = "";
                    state.imagenJuego = undefined;
                    state.paso = 1;
                    state.nombreBloque = "";
                    state.bloques = [];
                    state.nombreTema = "";
                    state.temas = [];
                    state.posicionTema = undefined;
                    state.iTema = undefined;
                    state.jTema = undefined;
                    state.preguntaEditari = undefined;
                    state.preguntaEditarj = undefined;
                    state.preguntasEditar = [];
                    this.props.close();
                    break;
                default:
                    break;
            }
        });
    }
    render() {
        var spans = [];
        for (var i = 0; i < this.state.bloques.length; i++) {
            spans.push(<div class='column'><span onClick={this.seleccionarBloque} id={"bloque-" + i} class='ui blue large label seleccionable'>{(i + 1)}. {this.state.bloques[i]}</span></div>);
        }
        var temas = [];
        for (var i = 0; i < this.state.temas.length; i++) {
            if (this.state.temas[i] != undefined) {
                for (var j = 0; j < this.state.temas[i].length; j++) {
                    var ob = {};
                    ob.key = "tema-" + i + "." + j;
                    ob.value = "tema-" + i + "." + j;
                    ob.text = (i + 1) + "." + (j + 1) + ". " + this.state.temas[i][j];
                    temas.push(ob);
                }
            }
        }
        return (
            <Modal id="registro" open={this.props.open} onClose={this.close} closeIcon closeOnDimmerClick>
                <Modal.Header>Crear juego nuevo</Modal.Header>
                <Modal.Content>
                    <Pasos />
                    <FormularioPaso1 change={this.onChange} />
                    <FormularioPaso2 anadirBloque={this.anadirBloque} change={this.onChange} />
                    <FormularioPaso3 anadirTema={this.anadirTema} change={this.onChange} spans={spans} />
                    <FormularioPaso4 anadirPregunta={this.anadirPregunta} change={this.onChange} temas={temas} state={this.state} seleccionarTema={this.seleccionarTema} seleccionarPregunta={this.seleccionarPregunta} preguntasEditar={this.state.preguntasEditar} cancelarEdicion={this.cancelarEdicion} editarPregunta={this.editarPregunta} seleccionarNivel={this.seleccionarNivel}/>
                </Modal.Content>
                <Modal.Actions>
                    <Button positive onClick={this.siguiente} id="botonSiguiente" animated>
                        <Button.Content visible>Siguiente</Button.Content>
                        <Button.Content hidden>
                            <Icon name='right arrow' />
                        </Button.Content>
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default CrearJuegoModal;

