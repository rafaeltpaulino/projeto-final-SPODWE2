import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";

const Navegacao = (props) => {
  const usuarioId = sessionStorage.getItem('usuarioId');
  const usuarioPapel = sessionStorage.getItem('usuarioPapel'); 
  const usuarioNome = sessionStorage.getItem('usuarioNome'); 
  
  // Estado para controlar se o menu está aberto
  const [dropdownAberto, setDropdownAberto] = useState(false);

  return (
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to='/categorias'>Categorias</NavLink>
      </li>
      
      {usuarioPapel === 'Administrador' && (
        <>
          <li><NavLink to="/tabela_receitas">Tabela de Receitas</NavLink></li>
          <li><NavLink to="/tabela_categorias">Tabela de Categorias</NavLink></li>
          <li><NavLink to="/tabela_usuarios">Tabela de Usuários</NavLink></li>
          <li><NavLink to="/tabela_avaliacoes">Tabela de Avaliações</NavLink></li>
        </>
      )}

      {!props.logado ? (
        <>
          <li><NavLink to='/cadastro'>Cadastrar-se</NavLink></li>
          <li><NavLink to='/login'>Login</NavLink></li>
        </>
      ) : (
        <li className="menu-usuario" onMouseLeave={() => setDropdownAberto(false)}>
          <button className="btn-usuario" onClick={() => setDropdownAberto(!dropdownAberto)}>
            {/* Gera Imagem com as letras iniciais*/}
            <img 
              src={`https://ui-avatars.com/api/?name=${usuarioNome}&background=feca57&color=2d3436&bold=true`} 
              alt="Avatar" 
              className="avatar-img" 
            />
            <span>{usuarioNome}</span>
            <span className={`setinha ${dropdownAberto ? 'aberta' : ''}`}>▼</span>
          </button>

          {dropdownAberto && (
            <div className="dropdown-menu">
              <Link to={`/dashboard/${usuarioId}`} onClick={() => setDropdownAberto(false)}>Minha Conta</Link>
              <Link to={`/dashboard/${usuarioId}#avaliacoes`} onClick={() => setDropdownAberto(false)}>Minhas Avaliações</Link>
              <Link to={`/dashboard/${usuarioId}#receitas`} onClick={() => setDropdownAberto(false)}>Minhas Receitas</Link>
              <Link 
                to="/" 
                className="link-sair" 
                onClick={() => {
                  setDropdownAberto(false);
                  props.handleLogout(); // Desloga o usuário
                }}
              >
                Sair
              </Link>
            
            </div>
          )}
        </li> 
      )}
    </ul>
  );
};

export default Navegacao;
