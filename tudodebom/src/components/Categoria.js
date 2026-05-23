import React from 'react';
import { Link } from 'react-router-dom';

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
            <Link to='/categorias'>
                Voltar
            </Link>

            <div className='cards-container'>
                {props.receitas.filter((receita) => receita.categoria === categoriaNome).map(r => (
                    <div key={r.id} className="card">

                        <img src={"/imagens/receitas/" + r.id + ".jpg"} className="card-img-top" alt={r.titulo} style={{ width: "100%", height: "160px", objectFit: "cover" }} />

                        <div className="card-body" style={{ padding: "15px" }}>
                            <h5 className="card-title" style={{ fontSize: "1.5em", margin: "0 0 10px 0", color: "#333" }}>
                                {r.nome}
                            </h5>

                            <p className="card-text" style={{ fontSize: "0.9em", color: "#666", height: "40px", overflow: "hidden" }}>
                                {r.categoria}
                            </p>

                            <p className="card-text" style={{ fontSize: "0.9em", color: "#666", height: "30px", overflow: "hidden" }}>
                                {r.autor}
                            </p>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categoria;