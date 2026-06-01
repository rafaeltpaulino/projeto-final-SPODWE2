import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TabelaAvaliacoes = (props) => {
    const [novaAvaliacao, setNovaAvaliacao] = useState({
        id: '',
        id_receita: '',
        id_usuario: '',
        nome_usuario: '',
        nota: '',
        comentario: '',
        data_avaliacao: ''
    });

    const [exibirFormulario, setExibirFormulario] = useState(false);

    const [edicao, setEdicao] = useState(false);

    const resetarFormulario = () => {
        setEdicao(false);
        setNovaAvaliacao({
            id: '',
            id_receita: '',
            id_usuario: '',
            nome_usuario: '',
            nota: '',
            comentario: '',
            data_avaliacao: ''
        });
        setExibirFormulario(false);
    };

    const iniciarEdicao = (avaliacao) => {
        setEdicao(true);
        setNovaAvaliacao({
            id: avaliacao.id,
            id_receita: avaliacao.id_receita,
            id_usuario: avaliacao.id_usuario,
            nome_usuario: avaliacao.nome_usuario,
            nota: avaliacao.nota,
            comentario: avaliacao.comentario,
            data_avaliacao: avaliacao.data_avaliacao
        });
        setExibirFormulario(true);
    };

    const navigate = useNavigate();

    const handleAvaliacaoForm = (e) => {
        e.preventDefault();

        // 1. Descobre quem é o usuário selecionado no formulário para pegar o ID dele
        const usuarioSelecionado = props.usuarios.find(u => u.nome === novaAvaliacao.nome_usuario);

        // 2. Monta o objeto final da avaliação garantindo que o id_usuario exista
        const avaliacaoParaSalvar = {
            ...novaAvaliacao,
            // Se achou o usuário no select, usa o ID dele. Se não, usa o ID da sessão como segurança.
            id_usuario: usuarioSelecionado ? usuarioSelecionado.id : Number(sessionStorage.getItem('usuarioId'))
        };

        if (!edicao) {
            props.adicionarAvaliacao(avaliacaoParaSalvar);
            alert(`Avaliação inserida com sucesso!`);
        } else {
            props.editarAvaliacao(avaliacaoParaSalvar);
            alert(`Avaliação atualizada com sucesso!`);
        }

        resetarFormulario();
    }

    return (
        <main className={props.modoInterno ? "" : "principal"}>
            <h2>Gerenciar Avaliações</h2>

            <button
                className="btn-adicionar"
                onClick={() => exibirFormulario ? resetarFormulario() : setExibirFormulario(true)}
            >
                {exibirFormulario ? "Cancelar" : "Nova Avaliação"}
            </button>

            {exibirFormulario && (
                <form style={{ margin: "20px 0", padding: "15px", border: "1px solid #ccc", borderRadius: "5px" }} onSubmit={handleAvaliacaoForm}>
                    <h3>{edicao ? "Editar Avaliação" : "Adicionar Nova Avaliação"}</h3>

                    <div style={{ marginBottom: "10px" }}>
                        <label>ID da Receita: </label>
                        <input type="text" value={novaAvaliacao.id_receita} onChange={(e) => setNovaAvaliacao({ ...novaAvaliacao, id_receita: e.target.value })} required />
                    </div>

                    <div style={{ marginBottom: "10px" }}>
                        <label>Nome do Usuário: </label>
                        <select value={novaAvaliacao.nome_usuario} onChange={(e) => setNovaAvaliacao({ ...novaAvaliacao, nome_usuario: e.target.value })} required>
                            <option value="">Selecione um usuário...</option>
                            {props.usuarios && props.usuarios.map((usuario) =>
                                <option key={usuario.id} value={usuario.nome}>
                                    {usuario.nome}
                                </option>
                            )}
                        </select>
                    </div>

                    <div style={{ marginBottom: "10px" }}>
                        <label>Nota: </label>
                        <input type="number" value={novaAvaliacao.nota} onChange={(e) => setNovaAvaliacao({ ...novaAvaliacao, nota: e.target.value })} placeholder="Ex: 5" required />
                    </div>

                    <div style={{ marginBottom: "10px" }}>
                        <label>Comentário: </label>
                        <textarea value={novaAvaliacao.comentario} onChange={(e) => setNovaAvaliacao({ ...novaAvaliacao, comentario: e.target.value })} required />
                    </div>

                    <div style={{ marginBottom: "10px" }}>
                        <label>Data da Avaliação: </label>
                        <input type="date" value={novaAvaliacao.data_avaliacao} onChange={(e) => setNovaAvaliacao({ ...novaAvaliacao, data_avaliacao: e.target.value })} required />
                    </div>

                    <button type="submit" style={{ cursor: "pointer" }} className="btn-ver">
                        {edicao ? "Atualizar Avaliação" : "Salvar Avaliação"}
                    </button>
                </form>
            )}

            <table className="tabela-dados">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>ID Receita</th>
                        <th>ID Usuário</th>
                        <th>Nome do Usuário</th>
                        <th>Nota</th>
                        <th>Comentário</th>
                        <th>Data</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {props.avaliacoes && props.avaliacoes.map((avaliacao) => (
                        <tr key={avaliacao.id}>
                            <td>{avaliacao.id}</td>
                            <td>{avaliacao.id_receita}</td>
                            <td>{avaliacao.id_usuario}</td>
                            <td>{avaliacao.nome_usuario}</td>
                            <td>{avaliacao.nota}</td>
                            <td style={{ maxWidth: "150px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{avaliacao.comentario}</td>
                            <td>{avaliacao.data_avaliacao}</td>
                            <td>
                                <button
                                    style={{ marginRight: "5px", cursor: "pointer", color: "#000000", fontWeight: "bold" }}
                                    onClick={() => navigate(`/avaliacoes/${avaliacao.id}`)}
                                >
                                    Ver
                                </button>

                                <button style={{ marginRight: "5px", cursor: "pointer" }} onClick={() => iniciarEdicao(avaliacao)}>Editar</button>
                                <button style={{ cursor: "pointer", color: "red" }} onClick={() => props.excluirAvaliacao(avaliacao.id)}>Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    );
};

export default TabelaAvaliacoes;
