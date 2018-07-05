import React from 'react';
import { Menu, Progress, Header, Image } from 'semantic-ui-react'

class BotonUsuario extends React.Component {
    render() {
        return (
            <Header>
                <Image size='tiny' src={require('../../assets/images/perfil.png')} />
                <Header.Content>
                    {this.props.datos.nombre}
                </Header.Content>
                <Progress value={this.props.datos.expActual} total={this.props.datos.expSiguiente} progress='percent' size='small' color='blue' className='barraExperiencia'/>
            </Header>
        );
    }
}
export default BotonUsuario;