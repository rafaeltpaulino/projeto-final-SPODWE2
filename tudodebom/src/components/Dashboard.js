import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MinhasAvaliacoes from "./MinhasAvaliacoes";
import TabelaReceitas from "./TabelaReceitas";

const Dashboard = (props) => {
    const [novaSenha, setNovaSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    
    const navigate = useNavigate();
    const location = useLocation(); // Hook para ler a URL atual

    // Define qual aba está ativa.
    const abaAtiva = location.hash || '#conta';

    const handleAtualizarSenha = (e) => {
        e.preventDefault();
        
        if (novaSenha !== confirmarSenha) {
            alert("As senhas não coincidem!");
            return;
        }
        
        const usuarioAtualizado = { ...props.usuario, senha: novaSenha };
        props.editarUsuario(usuarioAtualizado);
        
        alert("Senha atualizada com sucesso!");
        setNovaSenha('');
        setConfirmarSenha('');
    };

    const handleExcluirConta = () => {
        if (window.confirm("ATENÇÃO: Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita e todas as suas receitas continuarão na plataforma sob autoria anônima.")) {
            props.excluirUsuario(props.usuario.id);
            props.handleLogout();
            alert("Sua conta foi excluída com sucesso.");
            navigate('/');
        }
    };

    const handleSair = () => {
        props.handleLogout();
        navigate('/');
    };

    return (
        <div className='principal'>
            
            {/* Menu de Abas Internas */}
            <div style={{ display: 'flex', gap: '20px', marginBottom: '25px', borderBottom: '2px solid #f1f2f6', paddingBottom: '10px' }}>
                <button 
                    onClick={() => navigate(`#conta`)} 
                    style={{ background: 'none', border: 'none', fontSize: '1.1em', cursor: 'pointer', padding: '5px 10px', color: abaAtiva === '#conta' ? '#db7336' : '#7f8c8d', fontWeight: abaAtiva === '#conta' ? 'bold' : 'normal', borderBottom: abaAtiva === '#conta' ? '3px solid #db7336' : 'none' }}>
                    Configurações da Conta
                </button>
                <button 
                    onClick={() => navigate(`#avaliacoes`)} 
                    style={{ background: 'none', border: 'none', fontSize: '1.1em', cursor: 'pointer', padding: '5px 10px', color: abaAtiva === '#avaliacoes' ? '#db7336' : '#7f8c8d', fontWeight: abaAtiva === '#avaliacoes' ? 'bold' : 'normal', borderBottom: abaAtiva === '#avaliacoes' ? '3px solid #db7336' : 'none' }}>
                    Minhas Avaliações
                </button>
                <button 
                    onClick={() => navigate(`#receitas`)} 
                    style={{ background: 'none', border: 'none', fontSize: '1.1em', cursor: 'pointer', padding: '5px 10px', color: abaAtiva === '#receitas' ? '#db7336' : '#7f8c8d', fontWeight: abaAtiva === '#receitas' ? 'bold' : 'normal', borderBottom: abaAtiva === '#receitas' ? '3px solid #db7336' : 'none' }}>
                    Minhas Receitas
                </button>
            </div>

            {/* Renderiza apenas '#conta' */}
            {abaAtiva === '#conta' && (
                <div className="cartao-perfil">
                    <h2>Minha Conta</h2>
                    <div className="info-linha">
                        <strong>Nome:</strong> <span>{props.usuario.nome}</span>
                    </div>
                    <div className="info-linha">
                        <strong>Email:</strong> <span>{props.usuario.email}</span>
                    </div>

                    <hr style={{ margin: "20px 0", borderTop: "1px solid #e0e0e0" }} />

                    <h3 style={{ marginBottom: "15px", color: "#2c3e50" }}>Configurações de Segurança</h3>

                    <form onSubmit={handleAtualizarSenha} style={{ display: 'flex', gap: '15px', alignItems: 'flex-end', marginBottom: '25px' }}>
                        <div style={{ flex: 1 }}>
                            <label style={{ fontSize: '0.9em', display: 'block', marginBottom: '5px' }}>Nova Senha</label>
                            <input type="password" value={novaSenha} onChange={(e) => setNovaSenha(e.target.value)} required style={{ width: '100%' }} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ fontSize: '0.9em', display: 'block', marginBottom: '5px' }}>Confirmar Senha</label>
                            <input type="password" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} required style={{ width: '100%' }} />
                        </div>
                        <button type="submit" className="btn-ver" style={{ padding: '10px 20px', height: '42px', margin: 0 }}>Atualizar Senha</button>
                    </form>

                    { /* Botões de Ação da Conta */}
                    <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                        <button onClick={handleSair} className="btn-ver" style={{ backgroundColor: '#34495e', margin: 0 }}>
                            Sair da Conta
                        </button>
                        
                        <button onClick={handleExcluirConta} className="btn-perigo" style={{ margin: 0 }}>
                            Excluir Minha Conta
                        </button>
                    </div>
                </div>
            )}

            {/* Renderiza apenas'#avaliacoes' */}
            {abaAtiva === '#avaliacoes' && (
                <div id="avaliacoes">
                    {/* Encontra a receita e o autor */}
                    <MinhasAvaliacoes avaliacoes={props.avaliacoes} receitas={props.todasReceitas} />
                </div>
            )}
            
            {/* Renderiza apenas '#receitas' */}
            {abaAtiva === '#receitas' && (
                <div id="receitas">
                    <TabelaReceitas receitas={props.receitas}
                                    adicionarReceita={props.adicionarReceita}
                                    editarReceita={props.editarReceita}
                                    excluirReceita={props.excluirReceita}
                                    categorias={props.categorias}
                                    usuarios={[props.usuario]} 
                                    modoInterno={true} /* Concerta um espaçamento extra*//>
                </div>
            )}
            
        </div>
    );
};

export default Dashboard;
