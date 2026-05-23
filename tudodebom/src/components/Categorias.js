import React from 'react';
import { Link } from 'react-router-dom';

const Categorias = (props) => {
    return (
        <div className='principal'>
            <h2>
                Categorias
            </h2>
            <div className='cards-container'>
                {props.categorias.map((categoria) => (
                    <div key={categoria.id} className='card'>
                        <Link to={`/categoria/${categoria.slug}`} style={{textDecoration:'none'}}>
                            <img src={categoria.icone} className="card-img-top" alt={categoria.titulo} style={{ width: "100%", height: "160px", objectFit: "cover" }} />
                            <div className="card-body" style={{ padding: "15px" }}>
                                <h5 className="card-title" style={{ fontSize: "1.5em", margin: "0 0 10px 0", color: "#333" }}>
                                    {categoria.nome}
                                </h5>

                                <p className="card-text" style={{ fontSize: "0.9em", color: "#666", height: "40px", overflow: "hidden" }}>
                                    {categoria.descricao}
                                </p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categorias;