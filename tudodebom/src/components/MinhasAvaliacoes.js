import React from 'react';
import { Link } from 'react-router-dom';

const MinhasAvaliacoes = (props) => {
    return (
        <div className="minhas-avaliacoes-container">
            <h2>Minhas Avaliações</h2>
            
            {props.avaliacoes.length === 0 ? (
                <p style={{ color: "#7f8c8d", fontStyle: "italic", fontSize: "1.05em" }}>
                    Você ainda não fez nenhuma avaliação.
                </p>
            ) : (
                <div className="grid-avaliacoes">
                    {props.avaliacoes.map((avaliacao) => {
                        // Busca receita com o mesmo ID
                        const receita = props.receitas.find(r => r.id === avaliacao.id_receita);
                        
                        return (
                            <div key={avaliacao.id} className="card-avaliacao">
                                <div className="avaliacao-header">
                                    {/* Se a receita existir, mostra o nome. Se foi deletada do sistema, mostra um aviso */}
                                    <h4>{receita ? receita.nome : 'Receita indisponível'}</h4>
                                    <span className="autor-receita">
                                        por {receita ? receita.autor : 'Desconhecido'}
                                    </span>
                                </div>
                                
                                <div className="avaliacao-body">
                                    <div className="nota-estrelas">
                                        ⭐ <strong>{avaliacao.nota}</strong> / 5
                                    </div>
                                    <p className="comentario">"{avaliacao.comentario}"</p>
                                    <span className="data-avaliacao">{avaliacao.data_avaliacao}</span>
                                </div>
                                
                                <div className="avaliacao-footer">
                                    {receita && (
                                        <Link to={`/receitas/${avaliacao.id_receita}`} className="btn-ver">
                                            Ver Receita
                                        </Link>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default MinhasAvaliacoes;
