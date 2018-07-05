import React from 'react';
import Navbar from '../navbar/Navbar';
import Partidas from '../dashboard/Partidas'
import JuegosCreados from '../dashboard/JuegosCreados'
import $ from "jquery";
import swal from 'sweetalert';
import CrearJuegoModal from "../crearJuego/CrearJuegoModal"

class Dashboard extends React.Component {
    state = { login: false, modalCrearJuegoOpen: false }
    constructor() {
        super();
        this.comprobarToken();
    }
    comprobarToken() {
        function comprobar(contexto, callback) {
            if (localStorage.getItem("token")) {
                $.ajax({
                    url: "http://localhost:3001/comprobarToken/",
                    type: "POST",
                    crossDomain: true,
                    data: { token: localStorage.getItem("token") }
                }).done(function (data) {
                    callback(contexto, data);
                });
            } else {
                callback(contexto, false);
            }
        }
        const estado = this.state;
        var datos = comprobar(this, function (contexto, datos) {
            estado.login = datos;
            contexto.setState(estado);
        });
    }
    closeCrearJuego = (e) => {
        this.setState({ modalCrearJuegoOpen: false });
    }
    handleItemClick = (e, { name }) => {
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
            case "CrearJuego":
                this.setState({ modalCrearJuegoOpen: true });
                break;
            case "Inicio":
                var url = "http://" + window.location.host;
                window.location = url;
                break;
            case "Juegos":
                var url = "http://" + window.location.host + "/juegos";
                window.location = url;
                break;
        }
    }
    obtenerJuegosCreados() {
        var id = this.getIdDelToken();
        var juegos = $.ajax({
            url: "http://localhost:3001/juego/" + id,
            type: "GET",
            crossDomain: true,
            headers: { "Authorization": localStorage.getItem("token") },
            async: false
        }).responseText;
        return JSON.parse(juegos).Juegos;
    }
    obtenerPartidas() {
        var id = this.getIdDelToken();
        var partidas = $.ajax({
            url: "http://localhost:3001/partida/usuario/" + id,
            type: "GET",
            crossDomain: true,
            headers: { "Authorization": localStorage.getItem("token") },
            async: false
        }).responseText;
        return JSON.parse(partidas).partidas;
    }
    getIdDelToken() {
        function parseJwt(token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse(window.atob(base64));
        };
        var datos = parseJwt(localStorage.getItem("token"));
        return datos.id;
    }
    render() {
        var juegos = this.obtenerJuegosCreados();
        var datos = [];
        for (var i = 0; i < juegos.length; i++) {
            var o = {};
            o.nombre = juegos[i].nombre;
            o.imagen = "http://localhost:3001/imagen/juego/" + juegos[i].imagen;
            o.id = juegos[i].id;
            datos.push(o);
        }
        var partidas = this.obtenerPartidas();
        var datosPartidas = [];
        for (var i = 0; i < partidas.length; i++) {
            var o = {};
            o.nombre = partidas[i].nombre;
            o.imagen = "http://localhost:3001/imagen/juego/" + partidas[i].imagen;
            o.id = partidas[i].id;
            datosPartidas.push(o);
        }
        return (
            <div>
                <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link>
                <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css" />
                {this.state.login ? (
                    <React.Fragment>
                        <Navbar clickHandler={this.handleItemClick} />
                        <Partidas datos={datosPartidas}/>
                        <JuegosCreados clickHandler={this.handleItemClick} datos={datos} />
                        <CrearJuegoModal open={this.state.modalCrearJuegoOpen} close={this.closeCrearJuego} />
                    </React.Fragment>
                ) : (
                        <Navbar clickHandler={this.handleItemClick} />
                    )}
            </div>
        );
    }
}

export default Dashboard;