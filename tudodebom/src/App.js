import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Topo from "./components/Topo";
import Home from "./components/Home";
import TabelaReceitas from "./components/TabelaReceitas";
import Rodape from "./components/Rodape";
import TabelaUsuarios from "./components/TabelaUsuarios";
import TabelaCategorias from "./components/TabelaCategorias";
import axios from 'axios';


class App extends Component {
  state = {
    receitas: [],
    usuarios: [],
    categorias: [],
  };

  async componentDidMount() {
    try {
      const { data: receitas } = await axios.get('/api/receitas.json');
      const { data: usuarios } = await axios.get('/api/usuarios.json');
      const { data: categorias } = await axios.get('/api/categorias.json');

      this.setState({ receitas });
      this.setState({ usuarios });
      this.setState({ categorias });
    } catch (error) {
      console.log(error);
      document.querySelectorAll('.principal')[0].insertAdjacentHTML(
        "beforeend",
        "<p class'erro'>Mensagem de erro</p>"
      );
    } finally {
      console.log(this.state.receitas);
    }
  }

  handleAdicionarReceita = (receita) => {
    const receitas = [...this.state.receitas, receita];
    this.setState({receitas});
  }

  render() {
    return (
      <Router>
        <Topo />
        <Routes>
          <Route 
            path="/" 
            element={<Home receitas={this.state.receitas} />} />
          <Route 
            path="/receitas" 
            element={<TabelaReceitas receitas={this.state.receitas}
                                     adicionarReceita={this.handleAdicionarReceita} />} />
          <Route 
            path="/usuarios" 
            element={<TabelaUsuarios usuarios={this.state.usuarios} />} />
          <Route 
            path="/categorias" 
            element={<TabelaCategorias categorias={this.state.categorias} />} />
        </Routes>
        <Rodape />
      </Router>
    );
  }
}

export default App;
