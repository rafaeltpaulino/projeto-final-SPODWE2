import React from "react";
import { NavLink, useParams } from "react-router-dom";

const Navegacao = (props) => {

  const usuarioId = sessionStorage.getItem('usuarioId');

  return (
    <ul>
      <li>
        <NavLink to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to='/categorias'>
          Categorias
        </NavLink>
      </li>
      <li>
        <NavLink to="/tabela_receitas">
          Tabela de Receitas
        </NavLink>
      </li>
      <li>
        <NavLink to="/tabela_usuarios">
          Tabela de Usuários
        </NavLink>
      </li>
      <li>
        <NavLink to="/tabela_categorias">
          Tabela de Categorias
        </NavLink>
      </li>
      {!props.logado ? 
        (
          <>
            <li>
              <NavLink to='/cadastro'>
                Cadastrar-se
              </NavLink>
            </li>
            <li>
              <NavLink to='/login'>
                Login
              </NavLink>
            </li>
          </>
        ) : 
        (
          <li>
            <NavLink to={`/dashboard/${usuarioId}`}>
              Minha conta
            </NavLink>
          </li> 
        )
      }
    </ul>
  );
};

export default Navegacao;
