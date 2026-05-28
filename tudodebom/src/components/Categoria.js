import React from 'react';
import { Link } from 'react-router-dom';
import CardReceita from './CardReceita'; // Importando o card modularizado

const Categoria = (props) => {
  const categoriaNome = props.categoria.nome;

  return (
    <div className='principal'>
      <h2>
        {categoriaNome}
      </h2>
      <h3>
        {props.categoria.descricao}
      </h3>
      <div className="btn-voltar-container">
        <Link className="btn-ver" to='/categorias'>
          Voltar
        </Link>
      </div>

      <div className='cards-container'>
        {props.receitas.filter((receita) => receita.categoria === categoriaNome).map(r => (
          /* Renderiza o componente CardReceita, que já tem toda a lógica de imagens, hover e modais */
          <CardReceita key={r.id} receita={r} />
        ))}
      </div>
    </div>
  );
};

export default Categoria;
