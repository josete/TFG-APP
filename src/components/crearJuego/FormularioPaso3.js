import React from 'react';
import $ from "jquery";
import { Form, Button, Header, Modal, Input, Icon, Label, Step, Segment } from 'semantic-ui-react';

class FormularioPaso3 extends React.Component {
    render() {
        return (
            <Form id="formularioPaso3">
                <div id="bloquesParaTemas" class="ui stackable two column grid">
                    {this.props.spans}
                </div>
                <div id="temas" class="ui stackable two column grid">
                </div>
                <br />
                <Form.Field id="campoNombreTema">
                    <label>Nombre</label>
                    <Input label={{ icon: 'asterisk', color: "red" }} labelPosition='right corner' name="nombreTema" fluid placeholder='Nombre' type="text" onChange={this.props.change} id="nombreTema" />
                </Form.Field>
                <Button positive onClick={this.props.anadirTema}>Añadir <Icon name='add' /></Button>
            </Form>
        );
    }
}

export default FormularioPaso3;