import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';

const NovaAvaliacao = (props) => {
    const [nota, setNota] = useState(null);
    const [comentario, setComentario] = useState('');

    const handleAvaliacaoForm = (e) => {
        e.preventDefault();
        const usuarioId = sessionStorage.getItem('usuarioId');

        props.handleNovaAvaliacao(props.idReceita, Number(usuarioId), Number(nota), comentario);
    };

    useEffect(() => {
        console.log(nota);
    }, [nota]);

    return (
        <>
            {!props.logado ? (
                <div className="formulario-avaliacao">
                    <h3>Deixe sua avaliação</h3>

                    <form>
                        <div className="grupo-form">
                            <label htmlFor="notaReceita">Nota (1 a 5)</label>
                            <input type="number" disabled={true} id="notaReceita" min="1" max="5" placeholder="5" />
                        </div>

                        <div className="grupo-form comentario-form">
                        <label htmlFor="comentarioReceita">Comentário</label>
                            <Link to='/login' style={{textDecoration: 'underline'}}>
                                <textarea id="comentarioReceita" rows="3" value='Entre para avaliar a receita.' style={{cursor: 'pointer'}} readOnly />
                            </Link>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="formulario-avaliacao">
                    <h3>Deixe sua avaliação</h3>
                    <form onSubmit={handleAvaliacaoForm}>
                        <div className="grupo-form">
                            <label htmlFor="notaReceita">Nota (1 a 5)</label>
                            <input type="number" id="notaReceita" min="1" max="5" placeholder="5" required onChange={(e) => setNota(e.target.value)} />
                        </div>

                        <div className="grupo-form comentario-form">
                            <label htmlFor="comentarioReceita">Comentário</label>
                            <textarea id="comentarioReceita" rows="3" placeholder="O que você achou desta receita?" required onChange={(e) => setComentario(e.target.value)} />
                        </div>

                        <button type="submit" className="btn-enviar-avaliacao">
                            Enviar Avaliação
                        </button>
                    </form>
                </div>
            )}
        </>
    );
};

export default NovaAvaliacao;