import React from 'react';
import $ from "jquery";
import { Form, Button, Header, Modal, Input, Icon, Label, Step, Segment } from 'semantic-ui-react';

class Pasos extends React.Component {
    render() {
        return (
            <Step.Group ordered>
                <Step active id="1">
                    <Step.Content>
                        <Step.Title>Crear Juego</Step.Title>
                    </Step.Content>
                </Step>
                <Step id="2">
                    <Step.Content>
                        <Step.Title>Crear Bloques</Step.Title>
                    </Step.Content>
                </Step>
                <Step id="3">
                    <Step.Content>
                        <Step.Title>Crear Temas</Step.Title>
                    </Step.Content>
                </Step>
                <Step id="4">
                    <Step.Content>
                        <Step.Title>Añadir preguntas</Step.Title>
                    </Step.Content>
                </Step>
            </Step.Group>
        );
    }
}

export default Pasos;