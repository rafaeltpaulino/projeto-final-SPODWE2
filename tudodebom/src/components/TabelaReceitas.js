import React, { useState } from "react";

const TabelaReceitas = (props) => {
  const [novaReceita, setNovaReceita] = useState({
    id: null,
    nome: '',
    categoria: '',
    ingredientes: '',
    descricao: '',
    tempo: null,
    autor: '',
    imagem: ''
  });

  const [exibirFormulario, setExibirFormulario] = useState(false);
  
  const [edicao, setEdicao] = useState(false);

  const resetarFormulario = () => {
    setEdicao(false);
    setNovaReceita({
      id: null,
      nome: '',
      categoria: '',
      ingredientes: '',
      descricao: '',
      tempo: null,
      autor: '',
      imagem: ''
    })
    setExibirFormulario(false);
  };

  const iniciarEdicao = (receita) => {
    setEdicao(true);
    setNovaReceita({
      id: receita.id,
      nome: receita.nome,
      categoria: receita.categoria,
      ingredientes: receita.ingredientes,
      descricao: receita.descricao,
      tempo: receita.tempo,
      autor: receita.autor
    })
    setExibirFormulario(true);
  };

  const handleReceitaForm = (e) => {
    e.preventDefault();
    if(!edicao) {
      props.adicionarReceita(novaReceita);
      alert(`Receita de ${novaReceita.nome} inserida com sucesso!`);
    } else {
      props.editarReceita(novaReceita);
      alert(`Receita atualizada para ${novaReceita.nome} com sucesso!`);
    }

    resetarFormulario();
  }

  return (
    <main className="principal">
      <h2>Gerenciar Receitas</h2>

      <button
        className="btn-adicionar"
        onClick={() => exibirFormulario ? resetarFormulario() : setExibirFormulario(true)}
      >
        {exibirFormulario ? "Cancelar" : "Nova Receita"}
      </button>

      {exibirFormulario && (
        <form style={{ margin: "20px 0", padding: "15px", border: "1px solid #ccc", borderRadius: "5px" }} onSubmit={handleReceitaForm}>
          <h3>{edicao ? "Editar Receita" : "Adicionar Nova Receita"}</h3>

          <div style={{ marginBottom: "10px" }}>
            <label>Nome da Receita: </label>
            <input type="text" value={novaReceita.nome} onChange={(e) => setNovaReceita({ ...novaReceita, nome: e.target.value })} required />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>Categoria: </label>
              <select value={novaReceita.categoria} onChange={(e) => setNovaReceita({...novaReceita, categoria: e.target.value})} required>
              <option value="">Selecione uma categoria...</option>
              {props.categorias.map((categoria) => 
                <option value={categoria.nome}>
                  {categoria.nome}
                </option>
              )}
            </select>
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>Ingredientes: </label>
            <textarea type="text" value={novaReceita.ingredientes} onChange={(e) => setNovaReceita({ ...novaReceita, ingredientes: e.target.value })} required />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>Descrição: </label>
            <textarea type="text" value={novaReceita.descricao} onChange={(e) => setNovaReceita({ ...novaReceita, descricao: e.target.value })} required />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>Tempo de Preparo: </label>
            <input type="text" value={novaReceita.tempo} onChange={(e) => setNovaReceita({ ...novaReceita, tempo: e.target.value })} placeholder="Ex: 45min" required />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>Autor: </label>
            <select value={novaReceita.autor} onChange={(e) => setNovaReceita({ ...novaReceita, autor: e.target.value })} required>
              <option value="">Selecione um autor...</option>            
              {props.usuarios.map((usuario) => 
                <option value={usuario.nome}>
                  {usuario.nome}
                </option>
              )}
            </select>
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>Imagem: </label>
            <input type="text" value={novaReceita.imagem} onChange={(e) => setNovaReceita({ ...novaReceita, imagem: e.target.value })} />
          </div>

          <button type="submit" style={{ cursor: "pointer" }}>
            {edicao ? "Atualizar Receita" : "Salvar Receita"}
          </button>
        </form>
      )}

      <table className="tabela-dados">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Categoria</th>
            <th>Ingredientes</th>
            <th>Descrição</th>
            <th>Tempo</th>
            <th>Autor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {props.receitas.map((receita) => (
            <tr key={receita.id}>
              <td>{receita.id}</td>
              <td>{receita.nome}</td>
              <td>{receita.categoria}</td>
              <td>{receita.ingredientes}</td>
              <td>{receita.descricao}</td>
              <td>{receita.tempo} {'min'}</td>
              <td>{receita.autor}</td>
              <td>
                <button style={{ marginRight: "5px", cursor: "pointer" }} onClick={() => iniciarEdicao(receita)}>Editar</button>
                <button style={{ cursor: "pointer" }} onClick={() => props.excluirReceita(receita.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default TabelaReceitas;
