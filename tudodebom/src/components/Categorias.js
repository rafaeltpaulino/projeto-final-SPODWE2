import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Categoria = (props) => {
  const categoriaNome = props.categoria.nome;
  const [expandido, setExpandido] = useState(false);

  return (
    <div className='principal'>
      <h2>
        {categoriaNome}
      </h2>
      <h3>
        {props.categoria.descricao}
      </h3>
      <Link to='/categorias'>
        Voltar
      </Link>

      <div className='cards-container'>
        {props.receitas.filter((receita) => receita.categoria === categoriaNome).map(r => (
          <div key={r.id} className="card">

            <img src={'/' + r.imagem} className="card-img-top" alt={r.titulo} />

            {/* Corpo do Card */}
            <div className="card-body">
              <h5 className="card-title" >
                {r.nome} 
              </h5>
              <p className="card-text-categoria">
                {r.categoria}
              </p>
              <p className="card-text-autor">
                {r.autor}
              </p>

              <CardReceita key={r.id} receita={r} className="modal-janela" />

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

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

export default Categoria;
