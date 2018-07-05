import React from 'react';
import Navbar from '../navbar/Navbar';
import Tarjeta from '../utilidades/Tarjeta';
import { Header, Icon, Grid } from 'semantic-ui-react'
import $ from "jquery";
import swal from 'sweetalert';

class PaginaJuegos extends React.Component {
    state = { login: false }
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
        var juegos = $.ajax({
            url: "http://localhost:3001/juego/",
            type: "GET",
            crossDomain: true,
            headers: { "Authorization": localStorage.getItem("token") },
            async: false
        }).responseText;
        return JSON.parse(juegos).Juegos;
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
        return (
            <div>
                <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link>
                {this.state.login ? (
                    <React.Fragment>
                        <Navbar clickHandler={this.handleItemClick} />
                        <div class="juegosRecientes">
                            <Grid stackable columns={4}>
                                {datos.map(function (objeto) {
                                    return <Grid.Column><Tarjeta nombre={objeto.nombre} imagen={objeto.imagen} id={objeto.id} juego/></Grid.Column>
                                })}
                            </Grid>
                        </div>
                    </React.Fragment>
                ) : (
                        <Navbar clickHandler={this.handleItemClick} />
                    )}
            </div>
        );
    }
}

export default PaginaJuegos;