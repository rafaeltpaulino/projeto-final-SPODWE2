import React from 'react';
import { Link } from 'react-router-dom';

const Categorias = (props) => {
    return (
        <div className='principal'>
            {props.categorias.map((categoria) => (
                <Link key={categoria.id} to='*'>
                    <div className='card'>
                        <img src={"/imagens/categorias/" + categoria.id + ".jpg"} className="card-img-top" alt={categoria.titulo} style={{ width: "100%", height: "160px", objectFit: "cover" }} />
                        <div className="card-body" style={{ padding: "15px" }}>
                            <h5 className="card-title" style={{ fontSize: "1.5em", margin: "0 0 10px 0", color: "#333" }}>{categoria.nome}</h5>

                            <p className="card-text" style={{ fontSize: "0.9em", color: "#666", height: "40px", overflow: "hidden" }}>
                                {categoria.descricao}
                            </p>

                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default Categorias;