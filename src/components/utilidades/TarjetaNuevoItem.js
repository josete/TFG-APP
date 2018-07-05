import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react'

class TarjetaNuevoItem extends React.Component {
    render() {
        return (
            <Card onClick={this.props.clickHandler} name="CrearJuego">
                <Card.Content>
                    <Card.Header>
                        Crear juegos nuevo
                        <Icon name='add' />
                    </Card.Header>
                    <Card.Description>
                        Haz click para crear un juego nuevo
                    </Card.Description>
                </Card.Content>
            </Card>
        );
    }
}

export default TarjetaNuevoItem;