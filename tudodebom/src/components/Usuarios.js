import React, { useState } from "react";
// 1. Importando os dados do arquivo JSON

const Usuarios = (props) => {
  // 2. Controlando os dados com state para garantir a re-renderização ao excluir
  // Função para excluir um usuário da tabela (CRUD) 

  return (
    <main className="principal">
      <h2>Gerenciar Usuários</h2>
      <button className="btn-adicionar">Novo Usuário</button>
      
      <table className="tabela-dados">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Papel</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {/* O map itera sobre o array carregado do JSON[cite: 2] */}
          {props.usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.nome}</td>
              <td>{usuario.email}</td>
              <td>{usuario.papel}</td>
              <td>
                <button>Editar</button>
                <button >Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default Usuarios;
