import React, { useState } from 'react';

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleLoginForm = (e) => {
        e.preventDefault();
        const res = props.handleLogin(email, senha);
        if(res) {
            console.log('Funcionou!');
            console.log(res);
        } else {
            console.log('Vazio');
            console.log(res);
        }
    }

    return (
        <div className='principal'>
            <form onSubmit={handleLoginForm}>
                <label>
                    Email
                </label>
                <input type='text' onChange={(e) => setEmail(e.target.value)} />
                <label>
                    Senha
                </label>
                <input type='password' onChange={(e) => setSenha(e.target.value)} />
                <button type='submit'>
                    Entrar
                </button>
            </form>
        </div>
    );
};

export default Login;