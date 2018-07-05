import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react'
import $ from "jquery";
import CrearPartidaModal from '../crearPartida/CrearPartidaModal';

class Tarjeta extends React.Component {
    state = {modalCrearPartidaOpen: false}
    onclick = (e) =>{
        this.setState({ modalCrearPartidaOpen: true });
    }
    borrarJuego = (e, id) =>{
       var juegos = $.ajax({
            url: "http://localhost:3001/juego/"+id,
            type: "DELETE",
            crossDomain: true,
            headers: { "Authorization": localStorage.getItem("token") }
        })
    }
    closeCrearPartida = (e) => {
        this.setState({ modalCrearPartidaOpen: false });
    }
    render() {
        return (
            <Card>
                <Image src={this.props.imagen} />
                <Card.Content>
                    <Card.Header>
                        {this.props.nombre}
                        </Card.Header>
                </Card.Content>
                {this.props.juego &&
                <Card.Content extra textAlign="right">
                    <a class="enlaceTarjeta" onClick={this.onclick}>Crear Partida</a>
                    <CrearPartidaModal open={this.state.modalCrearPartidaOpen} close={this.closeCrearPartida} idJuego={this.props.id}/>
                </Card.Content>}
                {this.props.creado && <Card.Content extra textAlign="right">
                    <a class="enlaceTarjeta" onClick={((e)=>this.borrarJuego(e,this.props.id))}><Icon name='trash' size="big"/></a>
                </Card.Content>}
            </Card>
        );
    }
}

export default Tarjeta;