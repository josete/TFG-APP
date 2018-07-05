import React from 'react';
import { Header, Icon, Grid, Form, Radio, Button, Input, Image } from 'semantic-ui-react'
class Pregunta extends React.Component {
    render() {
        return (
            <div id="preguntaDiv" class="oculto">
                <h1 id="enunciadoPregunta">{this.props.pregunta.enunciado}</h1>
                <div id="imagenPreguntaDiv" class="visible">
                    <Image src={"http://localhost:3001/imagen/pregunta/"+this.props.pregunta.imagen} id="imagenPregunta"/>
                </div>
                <div id="tipoTest"> 
                    <Form.Field>
                        <Radio
                            label={this.props.pregunta.resA}
                            name='respuesta'
                            value='a'
                            checked={this.props.state.respuesta === 'a'}
                            onChange={this.props.change}
                            id="resA"
                        />
                    </Form.Field>
                    <Form.Field>
                        <Radio
                            label={this.props.pregunta.resB}
                            name='respuesta'
                            value='b'
                            checked={this.props.state.respuesta === 'b'}
                            onChange={this.props.change}
                            id="resB"
                        />
                    </Form.Field>
                    <Form.Field>
                        <Radio
                            label={this.props.pregunta.resC}
                            name='respuesta'
                            value='c'
                            checked={this.props.state.respuesta === 'c'}
                            onChange={this.props.change}
                            id="resC"
                        />
                    </Form.Field>
                    <Form.Field>
                        <Radio
                            label={this.props.pregunta.resD}
                            name='respuesta'
                            value='d'
                            checked={this.props.state.respuesta === 'd'}
                            onChange={this.props.change}
                            id="resD"
                        />
                    </Form.Field>
                </div>
                <div id="tipoProblema" class="oculto">
                    <Form.Field>
                        <label>Respuesta</label>
                        <Input name="respuesta" fluid placeholder='Respuesta' type="text" onChange={this.props.change}/>
                    </Form.Field>
                </div>
                <Button fluid color="green" onClick={this.props.click} name="Corregir">Corregir</Button>
            </div>
        );
    }
}
export default Pregunta;