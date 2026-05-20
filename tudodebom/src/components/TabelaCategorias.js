import React, { useState } from "react";

const TabelaCategorias = (props) => {
  const [novaCategoria, setNovaCategoria] = useState({
    id: null,
    nome: '',
    descricao: '',
    icone: ''
  });

  const [exibirFormulario, setExibirFormulario] = useState(false);
  
  const [edicao, setEdicao] = useState(false);
  
  const resetarFormulario = () => {
    setEdicao(false);
    setNovaCategoria({
      id: null,
      nome: '',
      descricao: '',
      icone: ''
    })
    setExibirFormulario(false);
  };

  const iniciarEdicao = (categoria) => {
    setEdicao(true);
    setNovaCategoria({
      id: categoria.id,
      nome: categoria.nome,
      descricao: categoria.descricao,
      icone: categoria.icone
    })
    setExibirFormulario(true);
  };

  const handleCategoriaForm = (e) => {
    e.preventDefault();
    if(!edicao) {
      props.adicionarCategoria(novaCategoria);
      alert(`Categoria ${novaCategoria.nome} inserida com sucesso!`);
    } else {
      props.editarCategoria(novaCategoria);
      alert(`Categoria atualizada para ${novaCategoria.nome} com sucesso!`);
    }

    resetarFormulario();
  }

  return (
    <main className="principal">
      <h2>Gerenciar Categorias</h2>

      <button
        className="btn-adicionar"
        onClick={() => exibirFormulario ? resetarFormulario() : setExibirFormulario(true)}
      >
        {exibirFormulario ? "Cancelar" : "Nova Categoria"}
      </button>

      {exibirFormulario && (
        <form style={{ margin: "20px 0", padding: "15px", border: "1px solid #ccc", borderRadius: "5px" }} onSubmit={handleCategoriaForm}>
          <h3>{edicao ? "Editar Categoria" : "Adicionar Nova Categoria"}</h3>

          <div style={{ marginBottom: "10px" }}>
            <label>Nome da Categoria: </label>
            <input type="text" value={novaCategoria.nome} onChange={(e) => setNovaCategoria({...novaCategoria, nome: e.target.value})} required />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>Descrição: </label>
            <textarea value={novaCategoria.descricao} onChange={(e) => setNovaCategoria({...novaCategoria, descricao: e.target.value})} rows="2" style={{ width: "100%" }} required />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>Caminho do Ícone: </label>
            <input type="text" value={novaCategoria.icone} onChange={(e) => setNovaCategoria({...novaCategoria, icone: e.target.value})} placeholder="Ex: imagens/categorias/doces.jpg" />
          </div>

          <button type="submit" style={{ cursor: "pointer" }}>
            {edicao ? "Atualizar Categoria" : "Salvar Categoria"}
          </button>
        </form>
      )}

      <table className="tabela-dados">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Ícone</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {props.categorias.map((categoria) => (
            <tr key={categoria.id}>
              <td>{categoria.id}</td>
              <td>{categoria.nome}</td>
              <td>{categoria.descricao}</td>
              <td>{categoria.icone}</td>
              <td>
                <button style={{ marginRight: "5px", cursor: "pointer" }} onClick={() => iniciarEdicao(categoria)}>Editar</button>
                <button style={{ cursor: "pointer" }} onClick={() => props.excluirCategoria(categoria.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default TabelaCategorias;
