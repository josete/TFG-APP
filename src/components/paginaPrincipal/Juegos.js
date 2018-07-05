import React from 'react';
import { Card, Icon, Image, Header, Grid } from 'semantic-ui-react'
import Tarjeta from '../utilidades/Tarjeta'

class Juegos extends React.Component {
    render() {
        return (
            <div class="juegosRecientes">
                <Header as='h1' dividing>
                    <Icon name='puzzle' />
                    <Header.Content>
                        Juegos recientes
                    </Header.Content>
                </Header>
                <Grid stackable columns={4}>
                {this.props.datos.map(function(objeto){
                        return <Grid.Column><Tarjeta nombre={objeto.nombre} imagen={objeto.imagen}/></Grid.Column>
                    })}
                </Grid>
            </div>
        );
    }
}

export default Juegos;