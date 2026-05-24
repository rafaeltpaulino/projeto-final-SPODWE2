import React, { useState } from 'react';

const NovaAvaliacao = (props) => {
    const [nota, setNota] = useState(null);
    const [comentario, setComentario] = useState('');

    return (
        <>
            {!props.logado ? (
                <div className="formulario-avaliacao">
                    <h3>Deixe sua avaliação</h3>

                    <form>
                        <div className="grupo-form">
                            <label htmlFor="notaReceita">Nota (1 a 5)</label>
                            <input type="number" disabled={true} id="notaReceita" min="1" max="5" placeholder="5" required />
                        </div>

                        <div className="grupo-form comentario-form">
                            <label htmlFor="comentarioReceita">Comentário</label>
                            <textarea id="comentarioReceita" disabled={true} rows="3" value='Entre para avaliar a receita.' required></textarea>
                        </div>

                        <button disabled={true} type="submit" className="btn-enviar-avaliacao">
                            Enviar Avaliação
                        </button>
                    </form>
                </div>
            ) : (
                <div className="formulario-avaliacao">
                    <h3>Deixe sua avaliação</h3>

                    <form>
                        <div className="grupo-form">
                            <label htmlFor="notaReceita">Nota (1 a 5)</label>
                            <input type="number" id="notaReceita" min="1" max="5" placeholder="5" required />
                        </div>

                        <div className="grupo-form comentario-form">
                            <label htmlFor="comentarioReceita">Comentário</label>
                            <textarea id="comentarioReceita" rows="3" placeholder="O que você achou desta receita?" required></textarea>
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