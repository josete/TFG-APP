import React from 'react';
import { Menu } from 'semantic-ui-react';
import InfoUsuario from './InfoUsuario';

class BotonUsuario extends React.Component {
    state = { nombre: "", expActual: 0, expSiguiente: 0 }
    constructor() {
        super();
        this.descomponerToken();
    }
    descomponerToken(){        
        function parseJwt (token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse(window.atob(base64));
        };
        var datos = parseJwt(localStorage.getItem("token"));
        const state = this.state;
        state.nombre = datos.nombre;
        state.expActual = datos.expActual;
        state.expSiguiente = datos.expSiguiente;        
        this.setState(state);
    }
    render() {
        return (
            <React.Fragment>
                <Menu.Item
                    name = 'Perfil'
                    active={this.props.activeItem === 'Perfil'}
                    onClick={this.props.clickHandler}> 
                    <InfoUsuario datos={this.state}/>                   
                </Menu.Item>
                <Menu.Item
                    name='Salir'
                    active={this.props.activeItem === 'Salir'}
                    onClick={this.props.clickHandler}
                />
            </React.Fragment>
        );
    }
}
export default BotonUsuario;