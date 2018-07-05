import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react'
import CrearPartidaModal from '../crearPartida/CrearPartidaModal';

class TarjetaJugar extends React.Component {
    handleItemClick = (e, { name }) => {
        var url = "http://" + window.location.host + "/jugar/"+name;
        window.location = url;
    }
    render() {
        return (
            <Card onClick={this.handleItemClick} name={this.props.id}>
                <Image src={this.props.imagen} />
                <Card.Content>
                    <Card.Header>
                        {this.props.nombre}
                    </Card.Header>
                </Card.Content>
            </Card>
        );
    }
}

export default TarjetaJugar;