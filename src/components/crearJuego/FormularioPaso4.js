import React from 'react';
import $ from "jquery";
import { Form, Button, Header, Modal, Input, Icon, Label, Step, Segment, Radio, Grid, TextArea,Select,Divider } from 'semantic-ui-react';

class FormularioPaso4 extends React.Component {
    state = {}
    render() {
        var niveles = [{text:1,value:1},{text:2,value:2},{text:3,value:3},{text:4,value:4},{text:5,value:5},
            {text:6,value:6},{text:7,value:7},{text:8,value:8},{text:9,value:9},{text:10,value:10}];
        return (
            <Form id="formularioPaso4">
                <Grid columns={2}>
                    <Grid.Column>
                        <Segment>
                            <Form.Field>
                                <label>Tema:</label>
                                <Select placeholder='Selecciona un tema' options={this.props.temas} onChange={this.props.seleccionarTema}/>
                            </Form.Field>                    
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <Segment>
                            <Form.Field>
                                <label>Preguntas:</label>
                                <Select placeholder='Selecciona una pregunta' options={this.props.preguntasEditar} onChange={this.props.seleccionarPregunta} id="preguntasEditar"/>
                            </Form.Field>                    
                        </Segment>
                    </Grid.Column>
                </Grid>
                <Divider />
                <Grid>
                    <Grid.Row stretched>
                        <Grid.Column width={4}>
                            <Segment>
                                <Form.Field id="campoNivelPregunta">
                                    <label>Nivel</label>
                                    {/*<Input label={{ icon: 'asterisk', color: "red" }} labelPosition='right corner' name="nivelPregunta" fluid placeholder='Nivel' type="number" onChange={this.props.change} id="nivelPregunta" />*/}
                                    <Select fluid placeholder='Selecciona un nivel' options={niveles} onChange={this.props.seleccionarNivel} id="nivelPregunta"/>
                                </Form.Field>
                            </Segment>
                            <Segment>
                                <Form.Field>
                                    Tipo de pregunta:
                        </Form.Field>
                                <Form.Field>
                                    <Radio
                                        label='Test'
                                        name='tipoPregunta'
                                        value='test'
                                        checked={this.props.state.tipoPregunta === 'test'}
                                        onChange={this.props.change}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Radio
                                        label='Problema'
                                        name='tipoPregunta'
                                        value='problema'
                                        checked={this.props.state.tipoPregunta === 'problema'}
                                        onChange={this.props.change}
                                    />
                                </Form.Field>
                            </Segment>
                            <Segment>
                                <Form.Field id="campoTiempoPregunta">
                                    <label>Tiempo</label>
                                    <Input name="tiempoPregunta" fluid placeholder='Tiempo' type="number" onChange={this.props.change} id="tiempoPregunta" />
                                </Form.Field>
                            </Segment>
                        </Grid.Column>
                        <Grid.Column width={12}>
                            <Segment>
                                <Form.Field id="campoEnunciadoPregunta">
                                    <label>Enunciado</label>
                                    <TextArea autoHeight name="enunciadoPregunta" fluid onChange={this.props.change} id="enunciadoPregunta" />
                                </Form.Field>
                                <Form.Field>
                                    <label>Imagen explicativa</label>
                                    <Input name="imagenPregunta" fluid placeholder='Imagen' type="file" onChange={this.props.change} id="imagenPregunta"/>
                                </Form.Field>
                            </Segment>
                            <Segment>
                                <Form.Field id="campoRespuestasTest">
                                    <label>Respuestas</label>
                                    <Input label={{ icon: 'asterisk', color: "red" }} labelPosition='right corner' name="RespuestaA" fluid placeholder='Respuesta A' type="text" onChange={this.props.change} id="RespuestaA"/>
                                    <Input label={{ icon: 'asterisk', color: "red" }} labelPosition='right corner' name="RespuestaB" fluid placeholder='Respuesta B' type="text" onChange={this.props.change} id="RespuestaB"/>
                                    <Input label={{ icon: 'asterisk', color: "red" }} labelPosition='right corner' name="RespuestaC" fluid placeholder='Respuesta C' type="text" onChange={this.props.change} id="RespuestaC"/>
                                    <Input label={{ icon: 'asterisk', color: "red" }} labelPosition='right corner' name="RespuestaD" fluid placeholder='Respuesta D' type="text" onChange={this.props.change} id="RespuestaD"/>
                                    <br />
                                    <div class="inline fields">
                                        <Form.Field>
                                            Respuesta Correcta:
                                        </Form.Field>
                                        <Form.Field>
                                            <Radio
                                                label='A'
                                                name='resCorrectaTest'
                                                value='a'
                                                checked={this.props.state.resCorrectaTest === 'a'}
                                                onChange={this.props.change}
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <Radio
                                                label='B'
                                                name='resCorrectaTest'
                                                value='b'
                                                checked={this.props.state.resCorrectaTest === 'b'}
                                                onChange={this.props.change}
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <Radio
                                                label='C'
                                                name='resCorrectaTest'
                                                value='c'
                                                checked={this.props.state.resCorrectaTest === 'c'}
                                                onChange={this.props.change}
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <Radio
                                                label='D'
                                                name='resCorrectaTest'
                                                value='d'
                                                checked={this.props.state.resCorrectaTest === 'd'}
                                                onChange={this.props.change}
                                            />
                                        </Form.Field>
                                    </div>
                                </Form.Field>
                                <Form.Field id="campoRespuestaProblema">
                                    <Form.Field>
                                        <label>Solución</label>
                                        <Input label={{ icon: 'asterisk', color: "red" }} labelPosition='right corner' name="solucionProblema" fluid placeholder='Solución' type="text" onChange={this.props.change} id="solucionProblema"/>
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Corrección</label>
                                        <Input label={{ icon: 'asterisk', color: "red" }} labelPosition='right corner' name="correcionProblema" fluid placeholder='Corrección' type="text" onChange={this.props.change} id="correcionProblema"/>
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Pista</label>
                                        <Input label={{ icon: 'asterisk', color: "red" }} labelPosition='right corner' name="pistaProblema" fluid placeholder='Pista' type="text" onChange={this.props.change} id="pistaProblema"/>
                                    </Form.Field>
                                </Form.Field>
                            </Segment>
                            <Button positive onClick={this.props.anadirPregunta} id="crearPregunta">Crear pregunta</Button>                            
                            <div id="editarPreguntasBotones">
                                <Button positive onClick={this.props.editarPregunta} id="editarPegunta">Editar pregunta</Button>
                                <Button negative onClick={this.props.cancelarEdicion} id="cancelarEdicion">Cancelar edición</Button>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Form>
        );
    }
}

export default FormularioPaso4;