import React from 'react';
import PaginaPrincipal from './components/paginas/PaginaPrincipal';
import Dashboard from './components/paginas/Dashboard';
import PaginaJuegos from './components/paginas/PaginaJuegos';
import Juego from './components/paginas/Juego';
import { BrowserRouter as Router, Route } from 'react-router-dom';


class App extends React.Component {
  render() {
    return (
      <Router>
      <div>
        <Route exact path="/" component={PaginaPrincipal} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/juegos" component={PaginaJuegos} />
        <Route path="/jugar" component={Juego} />
      </div>
  </Router>
    );
  }
}

export default App;
