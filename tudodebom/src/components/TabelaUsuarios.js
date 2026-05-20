import React, { useState } from "react";

const TabelaUsuarios = (props) => {
  const [novoUsuario, setNovoUsuario] = useState({
    id: null,
    nome: '',
    email: '',
    papel: '',
    senha: ''
  });

  const [edicao, setEdicao] = useState(false);
   
  const [exibirFormulario, setExibirFormulario] = useState(false);

  const resetarFormulario = () => {
    setEdicao(false);
    setNovoUsuario({
      id: null,
      nome: '',
      email: '',
      papel: '',
      senha: ''
    })
    setExibirFormulario(false);
  };
  
  const iniciarEdicao = (usuario) => {
    setEdicao(true);
    setNovoUsuario({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      papel: usuario.papel,
      senha: usuario.senha
    })
    setExibirFormulario(true);
  };

  const handleUsuarioForm = (e) => {
    e.preventDefault();
    if(!edicao) {
      props.adicionarUsuario(novoUsuario);
      alert(`Novo usuário ${novoUsuario.nome} adicionado com sucesso!`);
    } else {
      props.editarUsuario(novoUsuario);
      alert(`Usuário ${novoUsuario.nome} atualizado com sucesso!`);
    }

    resetarFormulario();
  }

  return (
    <main className="principal">
      <h2>Gerenciar Usuários</h2>

      <button
        className="btn-adicionar"
        onClick={() => exibirFormulario ? resetarFormulario() : setExibirFormulario(true)}
      >
        {exibirFormulario ? "Cancelar" : "Novo Usuário"}
      </button>

      {exibirFormulario && (
        <form style={{ margin: "20px 0", padding: "15px", border: "1px solid #ccc", borderRadius: "5px" }} onSubmit={handleUsuarioForm}>
          <h3>{edicao ? "Editar Usuário" : "Adicionar Novo Usuário"}</h3>

          <div style={{ marginBottom: "10px" }}>
            <label>Nome do Usuário: </label>
            <input type="text" value={novoUsuario.nome} onChange={(e) => setNovoUsuario({ ...novoUsuario, nome: e.target.value })} required />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>Email: </label>
            <input type="text" value={novoUsuario.email} onChange={(e) => setNovoUsuario({ ...novoUsuario, email: e.target.value })} required />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>Papel: </label>
            <input type="text" value={novoUsuario.papel} onChange={(e) => setNovoUsuario({ ...novoUsuario, papel: e.target.value })} required />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>Senha: </label>
            <input type="text" value={novoUsuario.senha} onChange={(e) => setNovoUsuario({ ...novoUsuario, senha: e.target.value })} required />
          </div>

          <button type="submit" style={{ cursor: "pointer" }}>
            {edicao ? "Atualizar Usuário" : "Salvar Usuário"}
          </button>
        </form>
      )}

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
          {props.usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.nome}</td>
              <td>{usuario.email}</td>
              <td>{usuario.papel}</td>
              <td>
                <button style={{ marginRight: "5px", cursor: "pointer" }} onClick={() => iniciarEdicao(usuario)}>Editar</button>
                <button style={{ cursor: "pointer" }} onClick={() => props.excluirUsuario(usuario.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default TabelaUsuarios;
