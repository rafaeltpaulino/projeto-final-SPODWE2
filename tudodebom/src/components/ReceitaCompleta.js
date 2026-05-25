import React, { Fragment, useEffect } from 'react';
import DateObject from 'react-date-object'
import Avaliacao from './Avaliacao';

const ReceitaCompleta = (props) => {
    const idUsuario = sessionStorage.getItem('usuarioId');
    const possuiAvaliacao = props.avaliacoes.find((a) => a.id_usuario === Number(idUsuario) && a.id_receita === props.receita.id);

    useEffect(() => {
        console.log('Estado do possui avaliação:');
        console.log(possuiAvaliacao);
    }, [possuiAvaliacao]);

    return (
        <div className="principal">
            <header className="receita-header">
                <h1 className="receita-titulo-principal">{props.receita.nome}</h1>
                <div className="receita-meta-dados">
                    <span>📁 <strong>Categoria:</strong> {props.receita.categoria}</span>
                    <span>✍️ <strong>Por:</strong> {props.receita.autor}</span>
                    <span>⏱️ <strong>Preparo:</strong> {props.receita.tempo}</span>
                    <span>⭐ <strong>Nota média:</strong> {props.receita.nota_media ? props.receita.nota_media.toFixed(2) : '--'}</span>
                </div>
            </header>

            <hr className="receita-divisor" />

            {/* Seções de Conteúdo */}
            <section className="receita-secao">
                <h3>📋 Ingredientes</h3>
                <p className="text-quebra-linha receita-texto">{props.receita.ingredientes}</p>
            </section>

            <section className="receita-secao">
                <h3>🍳 Modo de Preparo</h3>
                <p className="text-quebra-linha receita-texto">{props.receita.descricao}</p>

                <button onClick={() => window.history.back()} className="btn-voltar">Voltar</button>
            </section>

            <Avaliacao logado={props.logado} 
                           handleNovaAvaliacao={props.handleNovaAvaliacao}
                           idReceita={props.receita.id} 
                           possuiAvaliacao={possuiAvaliacao}
                           handleEditarAvaliacao={props.handleEditarAvaliacao}
                           />

            <div className='avaliacoes'>
                <h2>
                    Avaliações
                </h2>
                {props.avaliacoes.filter((avaliacao) => avaliacao.id_receita === props.receita.id).map((a) => (
                    <div key={a.id} className='avaliacao'>
                        <div className='nome-usuario'>
                            {a.nome_usuario}
                        </div>
                        <div className='nota'>
                            {a.nota}
                        </div>
                        <div className='data'>
                            {a.data_avaliacao}
                        </div>
                        <div className='comentario'>
                            {a.comentario}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReceitaCompleta;
