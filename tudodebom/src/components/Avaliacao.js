import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Avaliacao = (props) => {
    const [nota, setNota] = useState('');
    const [comentario, setComentario] = useState('');
    const [edicao, setEdicao] = useState(false);

    useEffect(() => {
        console.log(nota);
        console.log(props.possuiAvaliacao);
    }, [nota]);

    useEffect(() => {
        console.log(comentario);
    }, [comentario]);

    useEffect(() => {
        if(props.possuiAvaliacao) {
            setNota(props.possuiAvaliacao.nota);
            setComentario(props.possuiAvaliacao.comentario);
        }
    }, [edicao]);

    const handleAvaliacaoForm = (e) => {
        e.preventDefault();
        const usuarioId = sessionStorage.getItem('usuarioId');

        if(!props.possuiAvaliacao) {
            props.handleNovaAvaliacao(props.idReceita, Number(usuarioId), Number(nota), comentario);
            alert('Avaliação enviada com sucesso!');
        } else {
            props.handleEditarAvaliacao(props.idReceita, props.possuiAvaliacao, nota, comentario);
            alert('Avaliação editada com sucesso!');
            setEdicao(false);
        }
    };

    return (
        <>
            {!props.logado ? (
                <div className="formulario-avaliacao">
                    <h3>Deixe sua avaliação</h3>

                    <form>
                        <div className="grupo-form">
                            <label htmlFor="notaReceita">Nota (0 a 5)</label>
                            <input type="number" disabled={true} id="notaReceita" min="0" max="5" step="0.5" placeholder="--" readOnly />
                        </div>

                        <div className="grupo-form comentario-form">
                            <label htmlFor="comentarioReceita">Comentário</label>
                            <Link to='/login' style={{ textDecoration: 'underline' }}>
                                <textarea id="comentarioReceita" rows="3" value='Entre para avaliar a receita.' style={{ cursor: 'pointer' }} readOnly />
                            </Link>
                        </div>
                    </form>
                </div>
            ) : !props.possuiAvaliacao ? (
                <div className="formulario-avaliacao">
                    <h3>Deixe sua avaliação</h3>
                    <form onSubmit={handleAvaliacaoForm}>
                        <div className="grupo-form">
                            <label htmlFor="notaReceita">Nota (0 a 5)</label>
                            <input type="number" id="notaReceita" min="0" max="5" step="0.5" placeholder="--" required onChange={(e) => setNota(e.target.value)} />
                        </div>

                        <div className="grupo-form comentario-form">
                            <label htmlFor="comentarioReceita">Comentário</label>
                            <textarea id="comentarioReceita" rows="3" placeholder="O que você achou desta receita?" onChange={(e) => setComentario(e.target.value)} />
                        </div>

                        <button type="submit" className="btn-enviar-avaliacao">
                            Enviar Avaliação
                        </button>
                    </form>
                </div>
            ) : (
                <div className="formulario-avaliacao">
                    <h3>Deixe sua avaliação</h3>
                    <form onSubmit={handleAvaliacaoForm}>
                        <div className="grupo-form">
                            <label htmlFor="notaReceita">Nota (0 a 5)</label>
                            <input type="number" id="notaReceita" min="0" max="5" step="0.5" placeholder="5" value={!edicao ? props.possuiAvaliacao.nota : nota} required onChange={(e) => setNota(e.target.value)} disabled={edicao ? false : true} />
                        </div>

                        <div className="grupo-form comentario-form">
                            <label htmlFor="comentarioReceita">Comentário</label>
                            <textarea id="comentarioReceita" rows="3" placeholder="O que você achou desta receita?" value={!edicao ? props.possuiAvaliacao.comentario : comentario} onChange={(e) => setComentario(e.target.value)} disabled={edicao ? false : true} />
                        </div>

                        {!edicao ? (<button type="button" className="btn-enviar-avaliacao" onClick={() => setEdicao(true)}>
                            Editar Avaliação
                        </button>) : (
                            <>
                                <button type="submit" className="btn-enviar-avaliacao">
                                    Enviar Avaliação
                                </button>
                                <button type="button" className="btn-enviar-avaliacao" onClick={() => setEdicao(false)}>
                                    Cancelar
                                </button>
                            </>
                        )}
                    </form>
                </div>
            )}
        </>
    );
};

export default Avaliacao;
