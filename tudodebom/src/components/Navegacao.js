import React from "react";
import { NavLink } from "react-router-dom";

const Navegacao = () => {
  return (
    <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
        <NavLink to="/Receitas">Receitas</NavLink>
        </li>
        <li>
        <NavLink to="/Usuarios">Usuários</NavLink>
        </li>
        <li>
        <NavLink to="/Categorias">Categorias</NavLink>
        </li>
    </ul>
  );
}

export default Navegacao;