import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const TabelaReceitas = (props) => {
  const [novaReceita, setNovaReceita] = useState({
    id: '',
    nome: '',
    categoria: '',
    ingredientes: '',
    descricao: '',
    tempo: '',
    autor: '',
    autor_id: '',
    imagem: '',
    nota_media: '',
    quantidade_avaliacoes: ''
  });

  const [exibirFormulario, setExibirFormulario] = useState(false);
  const [edicao, setEdicao] = useState(false);
  const resetarFormulario = () => {
    setEdicao(false);
    setNovaReceita({
      id: '',
      nome: '',
      categoria: '',
      ingredientes: '',
      descricao: '',
      tempo: '',
      autor: '',
      autor_id: '',
      imagem: '',
      nota_media: '',
      quantidade_avaliacoes: ''
    });
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
      autor: receita.autor,
      autor_id: receita.autor_id,
      imagem: receita.imagem,
      nota_media: receita.nota_media,
      quantidade_avaliacoes: receita.quantidade_avaliacoes
    });
    setExibirFormulario(true);
  };

  const navigate = useNavigate();

  const handleReceitaForm = (e) => {
    e.preventDefault();

    // 1. Descobre quem é o usuário selecionado no formulário para pegar o ID dele
    const usuarioSelecionado = props.usuarios.find(u => u.nome === novaReceita.autor);

    // 2. Monta o objeto final da receita garantindo que o autor_id exista
    const receitaParaSalvar = {
      ...novaReceita,
      // Se achou o usuário no select, usa o ID dele. Se não, usa o ID da sessão como segurança.
      autor_id: usuarioSelecionado ? usuarioSelecionado.id : Number(sessionStorage.getItem('usuarioId')),
      // Garante que receitas novas comecem com nota zero
      nota_media: edicao ? novaReceita.nota_media : 0,
      quantidade_avaliacoes: edicao ? novaReceita.quantidade_avaliacoes : 0
    };

    if (!edicao) {
      props.adicionarReceita(receitaParaSalvar);
      alert(`Receita de ${receitaParaSalvar.nome} inserida com sucesso!`);
    } else {
      props.editarReceita(receitaParaSalvar);
      alert(`Receita atualizada para ${receitaParaSalvar.nome} com sucesso!`);
    }

    resetarFormulario();
  }

  return (
    <main className={props.modoInterno ? "" : "principal"}>
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
            <select value={novaReceita.categoria} onChange={(e) => setNovaReceita({ ...novaReceita, categoria: e.target.value })} required>
              <option value="">Selecione uma categoria...</option>
              {props.categorias.map((categoria) =>
                <option key={categoria.id} value={categoria.nome}>
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
            <input type="text" value={novaReceita.tempo} onChange={(e) => setNovaReceita({ ...novaReceita, tempo: e.target.value })} placeholder="Ex: 45" required />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>Autor: </label>
            <select value={novaReceita.autor} onChange={(e) => setNovaReceita({ ...novaReceita, autor: e.target.value })} required>
              <option value="">Selecione um autor...</option>
              {props.usuarios.map((usuario) =>
                <option key={usuario.id} value={usuario.nome}>
                  {usuario.nome}
                </option>
              )}
            </select>
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>Imagem (URL ou caminho local): </label>
            <input type="text" value={novaReceita.imagem} onChange={(e) => setNovaReceita({ ...novaReceita, imagem: e.target.value })} />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>Nota Média: </label>
            <input type="text" value={novaReceita.nota_media} onChange={(e) => setNovaReceita({ ...novaReceita, nota_media: e.target.value })} />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>Quantidade de Avaliações (URL ou caminho local): </label>
            <input type="text" value={novaReceita.quantidade_avaliacoes} onChange={(e) => setNovaReceita({ ...novaReceita, quantidade_avaliacoes: e.target.value })} />
          </div>

          <button type="submit" style={{ cursor: "pointer" }} className="btn-ver">
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
            <th>Nota Média</th>
            <th>Quantidade Avaliações</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {props.receitas.map((receita) => (
            <tr key={receita.id}>
              <td>{receita.id}</td>
              <td>{receita.nome}</td>
              <td>{receita.categoria}</td>
              {/* Limitando o texto na tabela para não quebrar o layout */}
              <td style={{ maxWidth: "150px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{receita.ingredientes}</td>
              <td style={{ maxWidth: "150px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{receita.descricao}</td>
              <td>{receita.tempo} min</td>
              <td>{receita.autor}</td>
              <td>{receita.nota_media}</td>
              <td>{receita.quantidade_avaliacoes}</td>
              <td>
                <button
                  style={{ marginRight: "5px", cursor: "pointer", color: "#000000", fontWeight: "bold" }}
                  onClick={() => navigate(`/receitas/${receita.id}`)}
                >
                  Ver
                </button>

                <button style={{ marginRight: "5px", cursor: "pointer" }} onClick={() => iniciarEdicao(receita)}>Editar</button>
                <button style={{ cursor: "pointer", color: "red" }} onClick={() => props.excluirReceita(receita.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default TabelaReceitas;
