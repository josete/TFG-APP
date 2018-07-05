import React from 'react';
import { Menu } from 'semantic-ui-react'
import logo from '../../assets/images/Gamificacion.png'
import BotonesSinEntrar from './BotonesSinEntrar';
import BotonUsuario from './BotonUsuario';


class Navbar extends React.Component {
    state = {}
    render() {
        const { activeItem } = this.state
        return (
            <Menu attached='top'>
                <Menu.Item onClick={this.props.clickHandler} name="Inicio">
                    <img src={logo} alt="Logo" />
                </Menu.Item>
                <Menu.Item
                    name='Juegos'
                    active={activeItem === 'Juegos'}
                    onClick={this.props.clickHandler}
                />
                <Menu.Item>
                    <div>
                        <div className='ui transparent icon input'>
                            <input className='prompt' type='text' placeholder='Buscar juegos...' />
                            <i className='search link icon' />
                        </div>
                        <div className='results' />
                    </div>
                </Menu.Item>
                <Menu.Menu position='right'>
                    {localStorage.getItem("token") ? (
                        <BotonUsuario clickHandler={this.props.clickHandler} activeItem={activeItem} />
                    ) : (
                        <BotonesSinEntrar clickHandler={this.props.clickHandler} activeItem={activeItem} />
                    )}
                </Menu.Menu>
            </Menu>
        );
    }
}

export default Navbar;