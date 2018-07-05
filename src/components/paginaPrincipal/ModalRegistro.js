import React from 'react';
import { Form, Button, Header, Modal, Input, Icon, Label } from 'semantic-ui-react'
import $ from "jquery";
import swal from 'sweetalert';

class ModalRegistro extends React.Component {
    state = { nombre: "", email: "", password: "" }
    onChange = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (state["email"].length != 0) {
            if (regex.test(state["email"])) {
                $("#emailNoValido").hide();
            } else {
                if ($('#emailNoValido').length == 0) {
                    $("#campoEmail").append("<div class='ui pointing red basic label' id='emailNoValido'>Email no válido</div>");
                }
            }
        }
    }
    enviar = (e) => {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/; 
        var props = this.props;      
        if (this.state["email"].length > 0 && this.state["nombre"].length > 0 && this.state["password"].length > 0 && regex.test(this.state["email"])) {
            $.ajax({
                url: "http://localhost:3001/usuario/",
                type: "POST",
                crossDomain: true,
                data: this.state,
                dataType: "json",
            }).done(function (data) {
                if (data["ok"] != undefined) {
                    swal(data["ok"], "", "success");   
                    props.close();                
                } else {
                    swal(data["err"], "", "error");
                }
            });
        } else {
            swal("Algún campo obligatorio está vacio", "", "error");
        }
    }    
    render() {
        return (
            <Modal id="registro" open={this.props.open} onClose={this.props.close} closeIcon closeOnDimmerClick>
                <Modal.Header>Registro</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Field>
                            <label>Nombre</label>
                            <Input icon='user' iconPosition='left' name="nombre" fluid placeholder='Nombre' type="text" onChange={this.onChange} />
                        </Form.Field>
                        <Form.Field id="campoEmail">
                            <label>Email</label>
                            <Input icon='mail' iconPosition='left' name="email" fluid placeholder='Email' type="email" onChange={this.onChange} />
                        </Form.Field>
                        <Form.Field>
                            <label>Contraseña</label>
                            <Input icon='privacy' iconPosition='left' name="password" fluid placeholder='Contraseña' type="password" onChange={this.onChange} />
                        </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={this.props.close}>Cerrar</Button>
                    <Button positive onClick={this.enviar} id="botonEnviar">Registrar</Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default ModalRegistro;