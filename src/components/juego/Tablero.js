import React from 'react';
import { Header, Icon, Grid, Breadcrumb } from 'semantic-ui-react'
class Tablero extends React.Component {
    render() {
        return (
            <React.Fragment>                
                <Grid stackable columns={4} id={this.props.id} className={this.props.class}>                    
                    {this.props.datos.map(function (objeto, index) {
                        return <Grid.Column><div className="casillaTablero" onClick={this.props.click} id={this.props.tipo + "-" + objeto.id}>{index + 1}. {objeto.nombre}
                            <Grid stackable columns={4} className="nombres">

                            </Grid>
                        </div></Grid.Column>
                    }, this)}
                </Grid>
            </React.Fragment>
        );
    }
}
export default Tablero;