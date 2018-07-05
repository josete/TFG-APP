import React from 'react';
import { Menu } from 'semantic-ui-react'

class BotonesSinEntrar extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Menu.Item
                    name='Entrar'
                    active={this.props.activeItem === 'Entrar'}
                    onClick={this.props.clickHandler}
                />
                <Menu.Item
                    name='Registrate'
                    active={this.props.activeItem === 'Registrate'}
                    onClick={this.props.clickHandler}
                />                
            </React.Fragment>
        );
    }
}
export default BotonesSinEntrar;