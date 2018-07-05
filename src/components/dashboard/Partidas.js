import React from 'react';
import { Header, Icon, Grid } from 'semantic-ui-react'
import Tarjeta from '../utilidades/TarjetaJugar'

class Partidas extends React.Component {
    render() {
        return (
            <div class="juegosRecientes">
                <Header as='h1' dividing>
                    <Icon name='gamepad' />
                    <Header.Content>
                        Mis partidas
                    </Header.Content>
                </Header>
                <Grid stackable columns={4}>
                {this.props.datos.map(function(objeto){
                        return <Grid.Column><Tarjeta nombre={objeto.nombre} imagen={objeto.imagen} id={objeto.id}/></Grid.Column>
                    })}
                </Grid>
            </div>
        );
    }
}

export default Partidas;