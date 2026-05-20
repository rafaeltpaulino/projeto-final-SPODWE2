import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className='principal'>
            <h2>
                Erro 404. Página não encontada.
            </h2>
            <p>
                <Link to='/'>
                    Voltar a página inicial.
                </Link>
            </p>
        </div>
    )
};

export default NotFound;