import React from 'react';
import { Form, Button, Header, Modal, Input, Icon, Grid } from 'semantic-ui-react'
import $ from "jquery";

class CrearPartidaModal extends React.Component {
    state = { nombre: "", idJuego: undefined, nombreUsuario: "", usuarios: [] }
    onChange = (e, { name }) => {
        const state = this.state;
        if (name == "nombreUsuario") {
            state[e.target.name] = e.target.value;
        } else if (name == "nombre") {
            state[e.target.name] = e.target.value;
            state.idJuego = this.props.idJuego;
        }
        this.setState(state);
    }
    enviar = (e) => {
        var props = this.props;
        var state = this.state;
        $.ajax({
            url: "http://localhost:3001/partida/",
            type: "POST",
            crossDomain: true,
            data: { nombre: state.nombre, idJuego: state.idJuego },
            dataType: "json",
        }).done(function (data) {
            for (var i = 0; i < state.usuarios.length; i++) {
                $.ajax({
                    url: "http://localhost:3001/partida/usuario/",
                    type: "POST",
                    crossDomain: true,
                    data: { nombreUsuario: state.usuarios[i], idPartida: data.id},
                    dataType: "json",
                }).done(function (data) {
                    props.close();
                });
            }
        });
    }
    anadirUsuario = (e) => {
        const state = this.state;
        state.usuarios.push(state.nombreUsuario);
        var segment = "<span class='ui gray large label'>" + state.nombreUsuario + "</span>"
        $("#nombreUsuario").val("");
        $("#usuariosAnadidos").append(segment);
        this.setState(state);
    }
    render() {
        return (
            <Modal id="crearPartida" open={this.props.open} onClose={this.props.close} closeIcon closeOnDimmerClick>
                <Modal.Header>Crear Partida</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Field>
                            <label>Nombre de la partida</label>
                            <Input fluid placeholder='Nombre' type="text" name="nombre" onChange={this.onChange} />
                        </Form.Field>
                        <Grid columns={2}>
                            <Grid.Column>
                                <label>Nombre del usuario</label>
                                <Input fluid placeholder='Nombre' type="text" name="nombreUsuario" onChange={this.onChange} id="nombreUsuario" />
                                <br /><Button positive onClick={this.anadirUsuario}>Añadir</Button>
                            </Grid.Column>
                            <Grid.Column>
                                <div id="usuariosAnadidos">

                                </div>
                            </Grid.Column>
                        </Grid>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={this.props.close}>Cerrar</Button>
                    <Button positive onClick={this.enviar}>Crear</Button>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default CrearPartidaModal;