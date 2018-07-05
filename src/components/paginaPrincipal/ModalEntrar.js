import React from 'react';
import { Form, Button, Header, Modal, Input, Icon } from 'semantic-ui-react'
import $ from "jquery";

class ModalEntrar extends React.Component {
    state = { email: "", password: "" }
    onChange = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }
    enviar = (e) => {
        var props = this.props;        
        $.ajax({
            url: "http://localhost:3001/usuario/login/",
            type: "POST",
            crossDomain: true,
            data: this.state,
            dataType: "json",
        }).done(function (data) {
            if (data["token"] != undefined) {
                localStorage.setItem('token', data["token"]); 
                props.close();                
            }
        });
    }
    render() {
        return (
            <Modal id="registro" open={this.props.open} onClose={this.props.close} closeIcon closeOnDimmerClick>
                <Modal.Header>Entrar</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Field>
                            <label>Email</label>
                            <Input icon='mail' iconPosition='left' fluid placeholder='Email' type="email" name="email" onChange={this.onChange}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Contraseña</label>
                            <Input icon='privacy' iconPosition='left' fluid placeholder='Contraseña' type="password" name="password" onChange={this.onChange}/>
                        </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={this.props.close}>Cerrar</Button>
                    <Button positive onClick={this.enviar}>Entrar</Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default ModalEntrar;