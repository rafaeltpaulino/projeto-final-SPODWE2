import React, { useState } from "react";

const Home = (props) => {
  const [expandido, setExpandido] = useState(false);
  return (
    <main className="principal">
      <h2>Bem-vindo(a) ao Compartilhamento de Receitas!</h2>
      <p>Seja bem-vindo ao nosso espaço gastronômico! Mais do que um simples sistema de gerenciamento, 
        este é o seu novo caderno de receitas digital — um lugar feito para guardar aqueles segredos culinários 
        que passam de geração em geração, as descobertas de novos sabores e os pratos que reúnem a família ao redor 
        da mesa.</p>
      <p>
        Cozinhar é misturar técnica com sentimento. Por isso, criamos esta plataforma para que você possa organizar 
        suas inspirações diárias, planejar seus jantares especiais e ter sempre à mão o passo a passo daquela sobremesa 
        inesquecível ou do prato principal perfeito.</p>
      <p>Portanto vamos começar! Utilize o menu acima para gerenciar as Receitas, Categorias e Usuários do sistema.</p>

      <table className="cards-dados">
        <tbody>
          <div style={{ 
            display: "flex", 
            flexWrap: "wrap",
            margin: "15px 0 0 0",
            gap: "20px",         
            justifyContent: "center"
            }}>

      
            {props.receitas.map((receita) => (
              <div key={receita.id} className="card" style={{ width: "18rem", border: "1px solid #ddd", marginBottom: "15px", borderRadius: "8px", overflow: "hidden", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>

              <img src={"/imagens/receitas/"+receita.id+".jpg"} className="card-img-top" alt={receita.titulo} style={{ width: "100%", height: "160px", objectFit: "cover" }} />
              
              {/* Corpo do Card */}
              <div className="card-body" style={{ padding: "15px" }}>
                <h5 className="card-title" style={{fontSize: "1.5em", margin: "0 0 10px 0", color: "#333" }}>{receita.nome}</h5>
                
                <p className="card-text" style={{ fontSize: "0.9em", color: "#666", height: "40px", overflow: "hidden" }}>
                  {receita.categoria}
                </p>

                <p className="card-text" style={{ fontSize: "0.9em", color: "#666", height: "30px", overflow: "hidden" }}>
                  {receita.autor}
                </p>
                
                <CardReceita key={receita.id} receita={receita} estilos={estilos} />
              
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
}

const estilos = {
  overlay: {
    position: "fixed", 
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",        
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    backgroundColor: "rgba(255, 250, 175, 0)"
  },
  janela: {
    backgroundColor: '#fff',
    width: '700px',    
    height: '400px',     
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
    
    display: 'flex',
    flexDirection: 'column',  
    overflowY: 'auto',         
    boxSizing: 'border-box' 
  }
};

function CardReceita({ receita, estilos }) {
  const [expandido, setExpandido] = useState(false);

  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "15px" }}>
      <span style={{ fontSize: "0.85em", color: "#999", marginRight: "10px" }}>⏱️ {receita.tempo}</span>
      <button onClick={() => setExpandido(true)} style={{ marginRight: "5px", cursor: "pointer", backgroundColor: "#db7336", color: "white", padding: "5px 10px", borderRadius: "4px", border: "none", fontSize: "0.9em" }}>
        Ver receita
      </button>

      {expandido && (
        <div style={estilos.overlay}>
          <div style={estilos.janela}>
            <h2>{receita.nome}</h2>
            <hr />
            <p style={{ whiteSpace: "pre-line" }}><strong>Ingredientes:</strong> {receita.ingredientes}</p>
            <p style={{ whiteSpace: "pre-line" }}><strong>Modo de preparo:</strong> {receita.descricao}</p>
            <hr />
            <button onClick={() => setExpandido(false)}>Fechar Janela</button>
          </div>
        </div>
      )}
    </div>
  );
}


export default Home;