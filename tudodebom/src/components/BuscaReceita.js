import React from 'react';
import { useParams } from 'react-router-dom';
import NotFound from './NotFound';
import ReceitaCompleta from './ReceitaCompleta';

const BuscaReceita = (props) => {
    const {receitaId} = useParams();
    const receita = props.receitas.find((receita) => receita.id === Number(receitaId));

    return receita ? <ReceitaCompleta receita={receita} avaliacoes={props.avaliacoes} logado={props.logado} /> : <NotFound />
};

export default BuscaReceita;