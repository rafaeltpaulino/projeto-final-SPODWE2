import React from 'react';
import { useParams } from 'react-router-dom';
import Categoria from './Categoria';
import NotFound from './NotFound';

const BuscaCategoria = (props) => {
  const {categoriaSlug} = useParams();
  const categoria = props.categorias.find((categoria) => categoria.slug === categoriaSlug);

  return categoria ? <Categoria categoria={categoria} receitas={props.receitas} /> : <NotFound />
};

export default BuscaCategoria;