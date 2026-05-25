import { useParams } from "react-router-dom";
import NotFound from "./NotFound";
import Dashboard from "./Dashboard";
import Unauthorized from "./Unauthorized";

const BuscaDashBoard = (props) => {
    const {usuarioId} = useParams();
    const currentUsuarioId = sessionStorage.getItem('usuarioId');
    const currentUsuarioIdNumber = Number(currentUsuarioId);

    if(Number(usuarioId) !== currentUsuarioIdNumber) {
        return <Unauthorized />
    } else {
        const usuario = props.usuarios.find((u) => u.id === currentUsuarioIdNumber);
        const avaliacoes = props.avaliacoes.filter((avaliacao) => avaliacao.id_usuario === currentUsuarioIdNumber);
        const receitas = props.receitas.filter((receita) => receita.autor_id === currentUsuarioIdNumber);
        console.log(avaliacoes);
        return <Dashboard avaliacoes={avaliacoes}
                          usuario={usuario}
                          receitas={receitas}
                          categorias={props.categorias}
                          adicionarReceita={props.handleAdicionarReceita}
                          editarReceita={props.handleEditarReceita}
                          excluirReceita={props.handleExcluirReceita} 
                           />  
    }
};

export default BuscaDashBoard;