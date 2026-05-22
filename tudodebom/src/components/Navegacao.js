import React from "react";
import { NavLink } from "react-router-dom";

const Navegacao = () => {
  return (
    <ul>
        <li>
          <NavLink to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/receitas">
            Receitas
          </NavLink>
        </li>
        <li>
          <NavLink to="/usuarios">
            Usuários
          </NavLink>
        </li>
        <li>
          <NavLink to="/categorias">
            Categorias
          </NavLink>
        </li>
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
    </ul>
  );
}

export default Navegacao;