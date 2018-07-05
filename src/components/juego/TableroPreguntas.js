import React from 'react';
import { Header, Icon, Grid } from 'semantic-ui-react'
class TableroPreguntas extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Grid stackable columns={4} id={this.props.id} className={this.props.class}>
                    {this.props.datos.map(function (objeto) {
                        return <Grid.Column><div className="casillaTableroPregunta" id={objeto.tipo.toLowerCase() + "-" + objeto.nivel + "-" + objeto.id}>{objeto.tipo} {objeto.nivel}
                            <Grid stackable columns={4} className="nombres">

                            </Grid>
                        </div></Grid.Column>
                    }, this)}
                </Grid>
            </React.Fragment>
        );
    }
}
export default TableroPreguntas;