import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CardReceita from './CardReceita'; 

const Categoria = (props) => {
  const categoriaNome = props.categoria.nome;
  const [pesquisa, setPesquisa] = useState('');

  const receitasFiltradas = props.receitas
    .filter((receita) => receita.categoria === categoriaNome)
    .filter((receita) => receita.nome.toLowerCase().includes(pesquisa.toLowerCase()));

  return (
    <div className='principal'>
      <h2>{categoriaNome}</h2>
      
      {/* 1. Subtítulo e botão alinhados lado a lado */}
      <div className="categoria-subtitulo-container">
        <h3>{props.categoria.descricao}</h3>
        <Link className="btn-ver" to='/categorias'>
          Voltar
        </Link>
      </div>

      {/* 2. Barra de pesquisa na linha abaixo, ocupando 100% da largura */}
      {/* Reduzi a margem superior (margin: '0 0 25px 0') para ficar próxima do subtítulo */}
      <div className="busca-container" style={{ margin: '0 0 25px 0' }}>
        <input
          type="text"
          placeholder={`Digite aqui o ${categoriaNome} que você procura...`}
          value={pesquisa}
          onChange={(e) => setPesquisa(e.target.value)}
          className="input-busca"
        />
      </div>

      {/* 3. Área dos Cards */}
      <div className='cards-container'>
        {receitasFiltradas.length > 0 ? (
          receitasFiltradas.map(r => (
            <CardReceita key={r.id} receita={r} />
          ))
        ) : (
          <p className="texto-alerta-vazio">
           Receita não escontrada.
          </p>
        )}
      </div>
    </div>
  );
};

export default Categoria;
