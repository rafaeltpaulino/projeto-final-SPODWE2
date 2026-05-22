import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleLoginForm = (e) => {
        e.preventDefault();

        const res = props.handleLogin(email, senha);

        if(res) {
            sessionStorage.setItem('usuario', res.nome);
            alert('Login realizado com sucesso!');
        } else {
            alert('Email ou senha incorretos');
        }
    }

    return (
        <div className='principal'>
            <h2>
                Login
            </h2>
            <form style={{ margin: "20px 0", padding: "15px", border: "1px solid #ccc", borderRadius: "5px" }} onSubmit={handleLoginForm}>
                <label>
                    Email
                </label>
                <input id='email' type='text' onChange={(e) => setEmail(e.target.value)} />
                <label>
                    Senha
                </label>
                <input id='senha' type='password' onChange={(e) => setSenha(e.target.value)} />
                <button type='submit' >
                    Entrar
                </button>
            </form>
            <p>
                Não possui uma conta?
                <br />
                <Link to='/cadastro'>
                    Cadastrar-se
                </Link>
            </p>
        </div>
    );
};

export default Login;