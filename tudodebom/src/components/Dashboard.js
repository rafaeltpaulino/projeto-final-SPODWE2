import MinhasAvaliacoes from "./MinhasAvaliacoes";
import TabelaReceitas from "./TabelaReceitas";

const Dashboard = (props) => {
    return (
        <div className='principal'>
            <div className="cartao-perfil">
                <h2>
                    Minha Conta
                </h2>
                <div className="info-linha">
                    <strong>Nome:</strong> <span>{props.usuario.nome}</span>
                </div>
                <div className="info-linha">
                    <strong>Email:</strong> <span>{props.usuario.email}</span>
                </div>
            </div>
            <MinhasAvaliacoes avaliacoes={props.avaliacoes} />
            <TabelaReceitas receitas={props.receitas}
                            adicionarReceita={props.handleAdicionarReceita}
                            editarReceita={props.handleEditarReceita}
                            excluirReceita={props.handleExcluirReceita}
                            categorias={props.categorias}
                            usuarios={[props.usuario]} />
        </div>
    );
};

export default Dashboard;