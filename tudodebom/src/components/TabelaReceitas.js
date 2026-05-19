import React, { useState } from "react";

const Receitas = (props) => {
  const [exibirFormulario, setExibirFormulario] = useState(false);
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
  // Novo state: vai guardar o ID da receita que estamos editando. 
  // Se for null, significa que estamos criando uma nova.
  const [edicao, setEdicao] = useState(false);

  // Função para limpar e fechar o formulário
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

  // Prepara o formulário com os dados da receita selecionada
  const iniciarEdicao = (receita) => {
    setEdicao(true); // Marca que estamos editando este ID
    setNovaReceita({
      id: receita.id,
      nome: receita.nome,
      categoria: receita.categoria,
      ingredientes: receita.ingredientes,
      descricao: receita.descricao,
      tempo: receita.tempo,
      autor: receita.autor
    })
    setExibirFormulario(true); // Mostra o form
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

  // Função adaptada: agora ela Cria ou Edita dependendo do state idEdicao

  return (
    <main className="principal">
      <h2>Gerenciar Receitas</h2>

      <button
        className="btn-adicionar"
        onClick={() => {
          if (exibirFormulario) {
            resetarFormulario();
          } else {
            setExibirFormulario(true);
          }
        }}
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
            <input type="text" value={novaReceita.categoria} onChange={(e) => setNovaReceita({ ...novaReceita, categoria: e.target.value })} required />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>Ingredientes: </label>
            <input type="text" value={novaReceita.ingredientes} onChange={(e) => setNovaReceita({ ...novaReceita, ingredientes: e.target.value })} required />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>Descrição: </label>
            <input type="text" value={novaReceita.descricao} onChange={(e) => setNovaReceita({ ...novaReceita, descricao: e.target.value })} required />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>Tempo de Preparo: </label>
            <input type="text" value={novaReceita.tempo} onChange={(e) => setNovaReceita({ ...novaReceita, tempo: e.target.value })} placeholder="Ex: 45min" required />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>Autor: </label>
            <select value={novaReceita.autor} onChange={(e) => setNovaReceita({ ...novaReceita, autor: e.target.value })} required>
              <option value="">Selecione um autor...</option>
              <option value="Vinícius Tiago">Vinícius Tiago</option>
              <option value="Amanda Jen">Amanda Jen</option>
              <option value="Kethelyn Alves">Kethelyn Alves</option>
              <option value="Rafael Teixeira">Rafael Teixeira</option>
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
                {/* O botão Editar agora chama a função passando a receita da linha atual */}
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

export default Receitas;
