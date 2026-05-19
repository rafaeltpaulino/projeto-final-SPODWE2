import React, { useState } from "react";
import dadosReceitas from "../dados/receitas.json";

const Receitas = () => {
  const [listaReceitas, setListaReceitas] = useState(dadosReceitas);
  const [exibirFormulario, setExibirFormulario] = useState(false);

  // Novo state: vai guardar o ID da receita que estamos editando. 
  // Se for null, significa que estamos criando uma nova.
  const [idEdicao, setIdEdicao] = useState(null);

  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState("");
  const [tempo, setTempo] = useState("");
  const [autor, setAutor] = useState("");

  // Função para limpar e fechar o formulário
  const resetarFormulario = () => {
    setIdEdicao(null);
    setNome("");
    setCategoria("");
    setTempo("");
    setAutor("");
    setExibirFormulario(false);
  };

  // Prepara o formulário com os dados da receita selecionada
  const iniciarEdicao = (receita) => {
    setIdEdicao(receita.id); // Marca que estamos editando este ID
    setNome(receita.nome);
    setCategoria(receita.categoria);
    setTempo(receita.tempo);
    setAutor(receita.autor);
    setExibirFormulario(true); // Mostra o form
  };

  const excluirReceita = (id) => {
    setListaReceitas(listaReceitas.filter(r => r.id !== id));
  };

  // Função adaptada: agora ela Cria ou Edita dependendo do state idEdicao
  const salvarReceita = (e) => {
    e.preventDefault(); 

    if (idEdicao) {
      // MODO EDIÇÃO: Atualiza a lista mapeando os itens. Se achar o ID, substitui os dados.
      const receitasAtualizadas = listaReceitas.map((receita) => 
        receita.id === idEdicao 
          ? { ...receita, nome: nome, categoria: categoria, tempo: tempo, autor: autor } 
          : receita
      );
      setListaReceitas(receitasAtualizadas);
    } else {
      // MODO CRIAÇÃO: Cria um novo registro
      const novaReceita = {
        id: Date.now(),
        nome: nome,
        categoria: categoria,
        tempo: tempo,
        autor: autor,
        imagem: "imagens/receitas/padrao.jpg"
      };
      setListaReceitas([...listaReceitas, novaReceita]);
    }

    resetarFormulario();
  };

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
        <form onSubmit={salvarReceita} style={{ margin: "20px 0", padding: "15px", border: "1px solid #ccc", borderRadius: "5px" }}>
          <h3>{idEdicao ? "Editar Receita" : "Adicionar Nova Receita"}</h3>
          
          <div style={{ marginBottom: "10px" }}>
            <label>Nome da Receita: </label>
            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>Categoria: </label>
            <select value={categoria} onChange={(e) => setCategoria(e.target.value)} required>
              <option value="">Selecione uma categoria...</option>
              <option value="Sobremesas">Sobremesas</option>
              <option value="Pratos Principais">Pratos Principais</option>
              <option value="Saladas">Saladas</option>
              <option value="Bebidas">Bebidas</option>
            </select>
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>Tempo de Preparo: </label>
            <input type="text" value={tempo} onChange={(e) => setTempo(e.target.value)} placeholder="Ex: 45min" required />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label>Autor: </label>
            <select value={autor} onChange={(e) => setAutor(e.target.value)} required>
              <option value="">Selecione um autor...</option>
              <option value="Vinícius Tiago">Vinícius Tiago</option>
              <option value="Amanda Jen">Amanda Jen</option>
              <option value="Kethelyn Alves">Kethelyn Alves</option>
              <option value="Rafael Teixeira">Rafael Teixeira</option>
            </select>
          </div>

          <button type="submit" style={{ cursor: "pointer" }}>
            {idEdicao ? "Atualizar Receita" : "Salvar Receita"}
          </button>
        </form>
      )}
      
      <table className="tabela-dados">
        <tbody>
          <div style={{ 
            display: "flex", 
            flexWrap: "wrap", 
            gap: "20px",         
            justifyContent: "center"
          }}>

    
          {listaReceitas.map((receita) => (
            <div key={receita.id} className="card" style={{ width: "18rem", border: "1px solid #ddd", marginBottom: "15px", borderRadius: "8px", overflow: "hidden", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
            
            {/* Imagem dinâmica da receita 
            <img src={receita.imagem} className="card-img-top" alt={receita.titulo} style={{ width: "100%", height: "160px", objectFit: "cover" }} />*/}
            
            {/* Corpo do Card */}
            <div className="card-body" style={{ padding: "15px" }}>
              <h5 className="card-title" style={{fontSize: "1.5em", margin: "0 0 10px 0", color: "#333" }}>{receita.nome}</h5>
              
              <p className="card-text" style={{ fontSize: "0.9em", color: "#666", height: "60px", overflow: "hidden" }}>
                {receita.categoria}
              </p>

              <p className="card-text" style={{ fontSize: "0.9em", color: "#666", height: "60px", overflow: "hidden" }}>
                {receita.autor}
              </p>
              
              <div style={{ display: "flex", justifyContent: "between", alignItems: "center", marginTop: "15px", }}>
                <span style={{ fontSize: "0.85em", color: "#999", marginRight: "10px" }}>⏱️ {receita.tempo}</span>
                
                <div>
                  <button onClick={() => iniciarEdicao(receita)} style={{ marginRight: "5px", cursor: "pointer", backgroundColor: "#db7336", color: "white", padding: "5px 10px", borderRadius: "4px", border: "none", fontSize: "0.9em" }}>
                    Editar
                  </button>

                  <button onClick={() => excluirReceita(receita.id)} style={{ cursor: "pointer", backgroundColor: "#d9534f", color: "white", padding: "5px 10px", borderRadius: "4px", border: "none", fontSize: "0.9em" }}>
                    Excluir
                  </button>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "between", alignItems: "center", marginTop: "15px" }}>
                
              </div>
            </div>

          </div>
          ))}
          </div>
        </tbody>
      </table>

    </main>
  );
};

export default Receitas;