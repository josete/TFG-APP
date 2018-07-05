import React from 'react';
import $ from "jquery";
import { Form, Button, Header, Modal, Input, Icon, Label, Step, Segment } from 'semantic-ui-react';

class FormularioPaso2 extends React.Component {
    render() {
        return (
            <Form id="formularioPaso2">
                <div id="bloques" class="ui stackable four column grid">
                </div>
                <br />
                <Form.Field id="campoNombreBloque">
                    <label>Nombre</label>
                    <Input label={{ icon: 'asterisk', color: "red" }} labelPosition='right corner' name="nombreBloque" fluid placeholder='Nombre' type="text" onChange={this.props.change} id="nombreBloque" />
                </Form.Field>
                <Button positive onClick={this.props.anadirBloque}>Añadir <Icon name='add' /></Button>
            </Form>
        );
    }
}

export default FormularioPaso2;