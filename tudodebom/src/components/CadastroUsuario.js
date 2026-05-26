import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const SENHA_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const CadastroUsuario = (props) => {
  const nomeRef = useRef();
  const errRef = useRef();

  const [nome, setNome] = useState('');
  const [nomeValido, setNomeValido] = useState(false);
  const [focoNome, setFocoNome] = useState(false);

  const [email, setEmail] = useState('');
  const [emailValido, setEmailValido] = useState(false);
  const [focoEmail, setFocoEmail] = useState(false);

  const [senha, setSenha] = useState('');
  const [senhaValida, setSenhaValida] = useState(false);
  const [focoSenha, setFocoSenha] = useState(false);

  const [confirmacaoSenha, setConfirmacaoSenha] = useState('');
  const [confirmacaoValida, setConfirmacaoValida] = useState('');
  const [focoCofirmacao, setFocoConfirmacao] = useState('');

  const [mensagemErr, setmensagemErr] = useState('');
  const [sucesso, setSucesso] = useState(false);

  useEffect(() => {
    nomeRef.current.focus();
  }, []);

  useEffect(() => {
    const res = EMAIL_REGEX.test(email);
    setEmailValido(res);
  }, [email]);

  useEffect(() => {
    const res = SENHA_REGEX.test(senha);
    setSenhaValida(res);
    const confirmacao = senha === confirmacaoSenha;
    setConfirmacaoValida(confirmacao);
  }, [senha, confirmacaoSenha]);

  useEffect(() => {
    const res = nome.length > 0;
    setNomeValido(res);
  }, [nome]);

  useEffect(() => {
    setmensagemErr('');
  }, [email, senha, confirmacaoSenha]);

  const handleCadastroForm = (e) => {
    e.preventDefault();

    const usuario = {
      id: 0,
      nome: nome,
      email: email,
      papel: 'Usuário',
      senha: senha
    };

    props.adicionarUsuario(usuario);
    setSucesso(true);
  };

  return (
    <>
      {sucesso ?
        (
          <div className='principal'>
            <h2>
              Cadastro realizado com sucesso!
            </h2>
            <p>
              <Link to='/login' className="btn-ver">
                Entrar
              </Link>
            </p>
          </div>
        ) :
        (
          <div className='principal'>
            <p ref={errRef} className={mensagemErr ? 'errmsg' : 'offscreen'} aria-live='assertive'>
              {mensagemErr}
            </p>
            <h2>
              Cadastro de usuário.
            </h2>
            <form className="form-cadastro" onSubmit={handleCadastroForm}>
              <label htmlFor='nome'>
                Nome:
                <span className={nome ? 'valid' : 'hide'}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={!nome ? 'invalid' : 'hide'}>
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                type='text'
                id='nome'
                ref={nomeRef}
                autoComplete='off'
                onChange={(e) => setNome(e.target.value)}
                required
                aria-describedby='nnote'
                onFocus={() => setFocoNome(true)}
                onBlur={() => setFocoNome(false)}
              />
              <label htmlFor='email'>
                Email:
                <span className={emailValido ? 'valid' : 'hide'}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={emailValido || !email ? 'hide' : 'invalid'}>
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                type='text'
                id='email'
                autoComplete='off'
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-invalid={emailValido ? 'false' : 'true'}
                aria-describedby='eidnote'
                onFocus={() => setFocoEmail(true)}
                onBlur={() => setFocoEmail(false)}
              />
              <p id='eidnote' className={focoEmail && email && !emailValido ? 'instructions' : 'offscreen'}>
                <FontAwesomeIcon icon={faInfoCircle} />
                Deve haver apenas letras, números, e alguns caracteres especiais (._%+-) antes do @.<br />
                <FontAwesomeIcon icon={faInfoCircle} />
                Deve haver apenas letras, números e os caracteres especiais - e . depois do @.<br />
                <FontAwesomeIcon icon={faInfoCircle} />
                Deve haver apenas letras depois do ponto (ou pontos).<br />
              </p>
              <label htmlFor='senha'>
                Senha:
                <span className={senhaValida ? 'valid' : 'hide'}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={senhaValida || !senha ? 'hide' : 'invalid'}>
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                type='password'
                id='senha'
                onChange={(e) => setSenha(e.target.value)}
                required
                aria-invalid={senhaValida ? 'false' : 'true'}
                aria-describedby='snote'
                onFocus={() => setFocoSenha(true)}
                onBlur={() => setFocoSenha(false)}
              />
              <p id='snote' className={focoSenha && senha && !senhaValida ? 'instructions' : 'offscreen'}>
                <FontAwesomeIcon icon={faInfoCircle} />
                8 a 24 caracteres.<br />
                <FontAwesomeIcon icon={faInfoCircle} />
                Deve conter letras maiúsculas e minúsculas, um número e um caractere especial<br />
                <FontAwesomeIcon icon={faInfoCircle} />
                Caracteres especiais permitidos: <span aria-label='exclamation mark'>!</span> <span aria-label='at symbol'>@</span><span aria-label='hashtag'>#</span><span aria-label='dollar sign'>$</span><span aria-label='percent'>%</span>
              </p>
              <label htmlFor='confirmacao_senha'>
                Confirmação de senha:
                <span className={confirmacaoValida && confirmacaoSenha ? 'valid' : 'hide'}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={confirmacaoValida || !confirmacaoSenha ? 'hide' : 'invalid'}>
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                type='password'
                id='confirmacao_senha'
                onChange={(e) => setConfirmacaoSenha(e.target.value)}
                required
                aria-invalid={confirmacaoValida ? 'false' : 'true'}
                aria-describedby='cnote'
                onFocus={() => setFocoConfirmacao(true)}
                onBlur={() => setFocoConfirmacao(false)}
              />
              <p id='cnote' className={focoCofirmacao && confirmacaoSenha && !confirmacaoValida ? 'instructions' : 'offscreen'}>
                <FontAwesomeIcon icon={faInfoCircle} />
                As senhas devem ser iguais.
              </p>

              <button type='submit' style={{ cursor: "pointer" }} disabled={!nomeValido || !emailValido || !senhaValida || !confirmacaoValida ? true : false}>
                Cadastrar-se
              </button>
            </form>
            <br />

            <p>
              Já possui uma conta?<br />
              <span>
                <div className="btn-voltar-container">
                  <Link to='/login' className="btn-ver">
                    Entrar
                  </Link>
                </div>
              </span>
            </p>
          </div>
        )
      }
    </>
  );
}

export default CadastroUsuario;