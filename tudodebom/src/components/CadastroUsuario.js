import React from 'react';
import { useRef, useState, useEffect } from 'react';
import {faCheck, faTimes, faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const SENHA_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const CadastroUsuario = (props) => {
  const nomeRef = useRef();
  const errRef = useRef();

  const [nome, setNome] = useState('');
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
    console.log(res);
    console.log(email);
    setEmailValido(res);
  }, [email]);

  useEffect(() => {
    const res = SENHA_REGEX.test(senha);
    console.log(res);
    console.log(senha);
    setSenhaValida(res);
    const confirmacao = senha === confirmacaoSenha;
    setConfirmacaoValida(confirmacao);
  }, [senha, confirmacaoSenha]);

  useEffect(() => {
    setmensagemErr('');
  }, [email, senha, confirmacaoSenha]);

  return (
    <div className='principal'>
      <p ref={errRef} className={mensagemErr ? 'errmsg' : 'offscreen'} aria-live='assertive'>
        {mensagemErr}
      </p>
      <h1>
        Cadastro de usuário.
      </h1>
      <form>
        <label htmlFor='nome'>
          Nome:
        </label>
        <input 
          type='text' 
          id='nome'
          ref={nomeRef} 
          autoComplete='off' 
          onChange={(e) => setNome(e.target.value)} 
          required 
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
          Deve haver apenas letras, números, e alguns caracteres especiais (._%+-) antes do @.<br/>
          <FontAwesomeIcon icon={faInfoCircle} />
          Deve haver apenas letras, números e os caracteres especiais - e . depois do @.<br/>
          <FontAwesomeIcon icon={faInfoCircle} />
          Deve haver apenas letras depois do ponto (ou pontos).<br/>
        </p>
      </form>
    </div>
  );
}

export default CadastroUsuario;