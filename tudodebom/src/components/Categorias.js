import React, { useState } from "react";
import dadosCategorias from "../dados/categorias.json";

const Categorias = () => {
  // Controle da lista de categorias carregada do JSON[cite: 2, 3]
  const [listaCategorias, setListaCategorias] = useState(dadosCategorias);
  
  // Controles de interface
  const [exibirFormulario, setExibirFormulario] = useState(false);
  const [idEdicao, setIdEdicao] = useState(null);

  // States para os campos do formulário de categoria
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [icone, setIcone] = useState("");

  // Limpa o formulário e o esconde
  const resetarFormulario = () => {
    setIdEdicao(null);
    setNome("");
    setDescricao("");
    setIcone("");
    setExibirFormulario(false);
  };

  // Carrega os dados da linha clicada para dentro do formulário
  const iniciarEdicao = (categoria) => {
    setIdEdicao(categoria.id);
    setNome(categoria.nome);
    setDescricao(categoria.descricao);
    setIcone(categoria.icone);
    setExibirFormulario(true);
  };

  // Exclui o registro da tabela
  const excluirCategoria = (id) => {
    setListaCategorias(listaCategorias.filter(c => c.id !== id));
  };

  // Salva a criação ou a edição (CRUD Completo)
  const salvarCategoria = (e) => {
    e.preventDefault(); // Impede o recarregamento da página (SPA)[cite: 3]

    if (idEdicao) {
      // MODO EDIÇÃO: Atualiza a categoria existente
      const categoriasAtualizadas = listaCategorias.map((categoria) => 
        categoria.id === idEdicao 
          ? { ...categoria, nome, descricao, icone } 
          : categoria
      );
      setListaCategorias(categoriasAtualizadas);
    } else {
      // MODO CRIAÇÃO: Adiciona nova categoria
      const novaCategoria = {
        id: Date.now(),
        nome: nome,
        descricao: descricao,
        icone: icone || "imagens/categorias/padrao.jpg" // Usa um padrão se ficar vazio[cite: 3]
      };
      setListaCategorias([...listaCategorias, novaCategoria]);
    }

    resetarFormulario();
  };

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
        <form onSubmit={salvarCategoria} style={{ margin: "20px 0", padding: "15px", border: "1px solid #ccc", borderRadius: "5px" }}>
          <h3>{idEdicao ? "Editar Categoria" : "Adicionar Nova Categoria"}</h3>
          
          <div style={{ marginBottom: "10px" }}>
            <label>Nome da Categoria: </label>
            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>Descrição: </label>
            <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} rows="2" style={{ width: "100%" }} required />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>Caminho do Ícone: </label>
            <input type="text" value={icone} onChange={(e) => setIcone(e.target.value)} placeholder="Ex: imagens/categorias/doces.jpg" />
          </div>

          <button type="submit" style={{ cursor: "pointer" }}>
            {idEdicao ? "Atualizar Categoria" : "Salvar Categoria"}
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
          {listaCategorias.map((categoria) => (
            <tr key={categoria.id}>
              <td>{categoria.id}</td>
              <td>{categoria.nome}</td>
              <td>{categoria.descricao}</td>
              <td>{categoria.icone}</td>
              <td>
                <button onClick={() => iniciarEdicao(categoria)} style={{ marginRight: "5px", cursor: "pointer" }}>Editar</button>
                <button onClick={() => excluirCategoria(categoria.id)} style={{ cursor: "pointer" }}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default Categorias;