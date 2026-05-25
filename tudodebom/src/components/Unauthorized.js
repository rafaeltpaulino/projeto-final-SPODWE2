import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className='principal'>
        <h2>
            Acesso não autorizado.
        </h2>
        <p>
            <Link to='/'>
                Voltar a página inicial.
            </Link>
        </p>
    </div>
  );
};

export default Unauthorized;