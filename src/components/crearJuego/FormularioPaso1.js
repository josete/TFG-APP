import React from 'react';
import $ from "jquery";
import { Form, Button, Header, Modal, Input, Icon, Label, Step, Segment } from 'semantic-ui-react';

class FormularioPaso1 extends React.Component {
    render() {
        return (
            <Form id="formularioPaso1">
                <Form.Field id="campoNombreJuego">
                    <label>Nombre</label>
                    <Input label={{ icon: 'asterisk', color: "red" }} labelPosition='right corner' name="nombreJuego" fluid placeholder='Nombre' type="text" onChange={this.props.change} />
                </Form.Field>
                <Form.Field>
                    <label>Imagen</label>
                    <Input name="imagenJuego" fluid placeholder='Imagen' type="file" onChange={this.props.change} />
                </Form.Field>
            </Form>
        );
    }
}

export default FormularioPaso1;