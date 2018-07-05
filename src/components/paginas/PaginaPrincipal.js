import React from 'react';
import Navbar from '../navbar/Navbar';
import Buscar from '../paginaPrincipal/Buscar';
import Juegos from '../paginaPrincipal/Juegos';
import ModalRegistro from '../paginaPrincipal/ModalRegistro';
import ModalEntrar from '../paginaPrincipal/ModalEntrar';
import $ from "jquery";

class PaginaPrincipal extends React.Component {
    state = { modalRegistroOpen: false, modalEntrarOpen: false }
    handleItemClick = (e, { name }) => {
        switch (name) {
            case "Registrate":
                this.setState({ modalRegistroOpen: true });
                break;
            case "Entrar":
                this.setState({ modalEntrarOpen: true });
                break;
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
    closeRegistro = (e) => {
        this.setState({ modalRegistroOpen: false });
    }
    closeEntrar = (e) => {
        this.setState({ modalEntrarOpen: false });
    }
    obtenerJuegosRecientes() {
        var juegos = $.ajax({
            url: "http://localhost:3001/juego/recientes",
            type: "GET",
            crossDomain: true,
            async: false
        }).responseText;
        return JSON.parse(juegos).Juegos;        
    }
    render() {
        var juegosRecientes = this.obtenerJuegosRecientes();
        var juegos = [];
        for (var i = 0; i < juegosRecientes.length; i++) {
            var o = {};
            o.nombre = juegosRecientes[i].nombre;
            o.imagen = "http://localhost:3001/imagen/juego/" + juegosRecientes[i].imagen;
            juegos.push(o);
        }
        return (
            <div>
                <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link>
                <Navbar clickHandler={this.handleItemClick} />
                <Buscar />
                <Juegos datos={juegos}/>
                <ModalRegistro open={this.state.modalRegistroOpen} close={this.closeRegistro} />
                <ModalEntrar open={this.state.modalEntrarOpen} close={this.closeEntrar} />
            </div>
        );
    }
}

export default PaginaPrincipal;