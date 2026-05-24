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
import Login from "./components/Login";
import Categorias from "./components/Categorias"
import BuscaCategoria from "./components/BuscaCategoria";
import ReceitaCompleta from "./components/ReceitaCompleta";
import BuscaReceita from "./components/BuscaReceita";

class App extends Component {
  state = {
    receitas: [],
    usuarios: [],
    categorias: [],
    avaliacoes: [],
    logado: false
  };

  currentReceitaId = 3;
  currentCategoriaId = 3;
  currentUsuarioId = 4;

  async componentDidMount() {
    try {
      const { data: receitas } = await axios.get('/api/receitas.json');
      const { data: usuarios } = await axios.get('/api/usuarios.json');
      const { data: categorias } = await axios.get('/api/categorias.json');
      const { data: avaliacoes } = await axios.get('/api/avaliacoes.json');

      this.setState({ receitas });
      this.setState({ usuarios });
      this.setState({ categorias });
      this.setState({avaliacoes});
    } catch (error) {
      console.log(error);
      document.querySelectorAll('.principal')[0].insertAdjacentHTML(
        "beforeend",
        "<p class'erro'>Mensagem de erro</p>"
      );
    } finally {
      console.log(this.state.avaliacoes);
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

  handleLogin = (email, senha) => {
    const usuario = this.state.usuarios.find((usuario) => 
      email === usuario.email && senha === usuario.senha
    );

    if(usuario) {
      sessionStorage.setItem('usuarioId', usuario.id);
      this.setState({logado: true});

      return true;
    } else {
      this.setState({logado: false});

      return false;
    }
  }

  render() {
    return (
      <Router>
        <Topo logado={this.state.logado} />
        <Routes>
          <Route
            path="/"
            element={<Home receitas={this.state.receitas} />}
          />
          <Route 
            path="/receitas/:receitaId" 
            element={<BuscaReceita receitas={this.state.receitas}
                                   avaliacoes={this.state.avaliacoes}
                                   logado={this.state.logado} />} 
          />
          <Route 
            path="/categorias"
            element={<Categorias categorias={this.state.categorias}/>}
          />
          <Route
            path="/tabela_receitas"
            element={<TabelaReceitas receitas={this.state.receitas}
                                     adicionarReceita={this.handleAdicionarReceita}
                                     editarReceita={this.handleEditarReceita}
                                     excluirReceita={this.handleExcluirReceita}
                                     categorias={this.state.categorias}
                                     usuarios={this.state.usuarios} />} 
          />
          <Route
            path="/tabela_usuarios"
            element={<TabelaUsuarios usuarios={this.state.usuarios}
                                     adicionarUsuario={this.handleAdicionarUsuario}
                                     editarUsuario={this.handleEditarUsuario}
                                     excluirUsuario={this.handleExcluirUsuario} />}
          />
          <Route
            path="/tabela_categorias"
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
            element={<CadastroUsuario adicionarUsuario={this.handleAdicionarUsuario} />}
          />
          <Route
            path="/login"
            element={<Login handleLogin={this.handleLogin} />}
          />
          <Route 
            path="/categoria/:categoriaSlug"
            element={<BuscaCategoria categorias={this.state.categorias}
                                     receitas={this.state.receitas} />}
          />
        </Routes>
        <Rodape />
      </Router>
    );
  }
}

export default App;
