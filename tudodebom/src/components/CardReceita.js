import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CardReceita = ({ receita }) => {
  const [expandido, setExpandido] = useState(false);
  const navigate = useNavigate();

  const irParaReceitaCompleta = (e) => {
    e.stopPropagation();
    navigate(`/receitas/${receita.id}`);
  };

  return (
    <>
      <div className="card" onClick={() => setExpandido(true)}>
        <img 
          src={receita.imagem.startsWith('http') ? receita.imagem : '/' + receita.imagem} 
          className="card-img-top" 
          alt={receita.nome} 
        />        
        <div className="card-body">
          <div className="card-text-title">
            <h5>{receita.nome}</h5>
          </div>
          
          <div className="card-footer">
            <p className="card-text-categoria">{receita.categoria} </p>
            <p className="card-text-autor">{receita.autor} </p>
          </div>
          
          <div className="card-acoes">
            <span className="card-tempo">⏱️ {receita.tempo} min</span>
            <span style={{ fontSize: "0.85em", color: "#db7336", fontWeight: "bold" }}>Ver Ingredientes</span>
          </div>
        </div>
      </div>

      {expandido && (
        <div className="modal-overlay" onClick={() => setExpandido(false)}>
          <div className="modal-janela modal-janela-larga" onClick={(e) => e.stopPropagation()}>
            <h2>{receita.nome}</h2>
            <div className="modal-conteudo-dividido">
              <div className="modal-coluna-imagem">
                <img 
                src={receita.imagem.startsWith('http') ? receita.imagem : '/' + receita.imagem} 
                alt={receita.nome} 
                className="modal-imagem-produto" 
                />
              </div>

              <div className="modal-coluna-texto">
                <p className="text-quebra-linha"><strong>Ingredientes:</strong> <br/> {receita.ingredientes}</p>
              </div>

            </div>
            
            <div className="modal-botoes-container">
              <button onClick={() => setExpandido(false)} className="btn-fechar-ingredientes">Fechar</button>
              <button onClick={irParaReceitaCompleta} className="btn-ver">Ver Receita</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CardReceita;
