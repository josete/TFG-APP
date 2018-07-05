import React from 'react';
import { Header, Icon, Grid } from 'semantic-ui-react'
import Tarjeta from '../utilidades/Tarjeta'
import TarjetaNuevoItem from '../utilidades/TarjetaNuevoItem'

class JuegosCreados extends React.Component {
    render() {
        return (
            <div class="juegosRecientes">
                <Header as='h1' dividing>
                    <Icon name='puzzle' />
                    <Header.Content>
                        Juegos creados
                    </Header.Content>
                </Header>
                <Grid stackable columns={4}>
                    {this.props.datos.map(function(objeto){
                        return <Grid.Column><Tarjeta nombre={objeto.nombre} imagen={objeto.imagen} id={objeto.id} creado/></Grid.Column>
                    })}                    
                    <Grid.Column>
                        <TarjetaNuevoItem clickHandler={this.props.clickHandler} />
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default JuegosCreados;