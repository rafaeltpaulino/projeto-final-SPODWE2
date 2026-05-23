import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

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

      <div className="cards-container">
            {props.receitas.map((receita) => (
              <div key={receita.id} className="card">

              <img src={receita.imagem} className="card-img-top" alt={receita.titulo} />
              
              {/* Corpo do Card */}
              <div className="card-body">
                <h5 className="card-title" >{receita.nome} </h5>
                <p className="card-text-categoria">{receita.categoria} </p>
                <p className="card-text-autor">{receita.autor} </p>
                
                <CardReceita key={receita.id} receita={receita} className="modal-janela" />
          
                </div>

              </div>
            ))}
        </div>
    </main>
  );
}

function CardReceita({ receita }) {
  const [expandido, setExpandido] = useState(false);
  const navigate = useNavigate();

  const ReceitaCompleta = () => {
    navigate(`/receitas/${receita.id}`);
  }

  return (
    <div className="card-acoes">
      <span className="card-tempo">⏱️ {receita.tempo}</span>
      <button onClick={() => setExpandido(true)} className="btn-ver">Ver Ingredientes </button>

      {expandido && (
        <div className="modal-overlay">
          <div className="modal-janela">
            <h2>{receita.nome}</h2>
            <hr />
            <p className="text-quebra-linha"><strong>Ingredientes:</strong> {receita.ingredientes} </p>
            <hr />
            
            <div className="modal-botoes-container">
              <button onClick={() => setExpandido(false)} className="btn-fechar-ingredientes">Fechar Janela </button>
              <button onClick={ReceitaCompleta} className="btn-ver">Ver Receita</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


export default Home;
