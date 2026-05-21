import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Topo from "./components/Topo";
import Home from "./components/Home";
import TabelaReceitas from "./components/TabelaReceitas";
import Rodape from "./components/Rodape";
import TabelaUsuarios from "./components/TabelaUsuarios";
import TabelaCategorias from "./components/TabelaCategorias";
import axios from 'axios';
import NotFound from "./components/NotFound";
import CadastroUsuario from "./components/CadastroUsuario";

class App extends Component {
  state = {
    receitas: [],
    usuarios: [],
    categorias: [],
  };

  currentReceitaId = 3;
  currentCategoriaId = 3;
  currentUsuarioId = 4;

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
    }
  }

  handleAdicionarReceita = (receita) => {
    this.currentReceitaId++;
    const receitas = [...this.state.receitas, {...receita, id: this.currentReceitaId}];
    this.setState({ receitas });
  }

  handleEditarReceita = (receita) => {
    const receitas = this.state.receitas.map((r) => 
      r.id === receita.id ? receita : r
    );
    this.setState({receitas});
  }

  handleExcluirReceita = (receitaId) => {
    if (window.confirm('Deseja realmente excluir essa receita?')){
      const receitas = this.state.receitas.filter((r) => r.id !== receitaId);
      this.setState({receitas});
    }
  }

  handleAdicionarUsuario = (usuario) => {
    this.currentUsuarioId++;
    const usuarios = [...this.state.usuarios, {...usuario, id: this.currentUsuarioId}];
    this.setState({usuarios});
  }

  handleEditarUsuario = (usuario) => {
    const usuarios = this.state.usuarios.map((u) => 
      u.id === usuario.id ? usuario : u
    );
    this.setState({usuarios});
  }

  handleExcluirUsuario = (usuarioId) => {
    if(window.confirm('Deseja realmente excluir esse usuário?')){
      const usuarios = this.state.usuarios.filter((u) => u.id !== usuarioId);
      this.setState({usuarios});
    }
  }

  handleAdicionarCategoria = (categoria) => {
    this.currentCategoriaId++;
    const categorias = [...this.state.categorias, {...categoria, id: this.currentCategoriaId}];
    this.setState({categorias});
  }

  handleEditarCategoria = (categoria) => {
    const categorias = this.state.categorias.map((c) =>
      c.id === categoria.id ? categoria : c
    );
    this.setState({categorias});
  }

  handleExcluirCategoria = (categoriaId) => {
    const categorias = this.state.categorias.filter((c) => c.id !== categoriaId);
    this.setState({categorias});
  }

  render() {
    return (
      <Router>
        <Topo />
        <Routes>
          <Route
            path="/"
            element={<Home receitas={this.state.receitas} />}
          />
          <Route
            path="/receitas"
            element={<TabelaReceitas receitas={this.state.receitas}
                                     adicionarReceita={this.handleAdicionarReceita}
                                     editarReceita={this.handleEditarReceita}
                                     excluirReceita={this.handleExcluirReceita}
                                     categorias={this.state.categorias}
                                     usuarios={this.state.usuarios} />} 
          />
          <Route
            path="/usuarios"
            element={<TabelaUsuarios usuarios={this.state.usuarios}
                                     adicionarUsuario={this.handleAdicionarUsuario}
                                     editarUsuario={this.handleEditarUsuario}
                                     excluirUsuario={this.handleExcluirUsuario} />}
          />
          <Route
            path="/categorias"
            element={<TabelaCategorias categorias={this.state.categorias}
                                       adicionarCategoria={this.handleAdicionarCategoria}
                                       editarCategoria={this.handleEditarCategoria}
                                       excluirCategoria={this.handleExcluirCategoria} />}
         />
          <Route 
            path="*" 
            element={<NotFound />} 
          />
          <Route
            path="/cadastro"
            element={<CadastroUsuario adicionarUsuario={this.handleAdicionarUsuario}
                                      usuarios={this.state.usuarios} />}
          />
        </Routes>
        <Rodape />
      </Router>
    );
  }
}

export default App;
