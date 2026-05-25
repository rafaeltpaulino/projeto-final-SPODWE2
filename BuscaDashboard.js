import { useParams } from "react-router-dom";
import NotFound from "./NotFound";
import Dashboard from "./Dashboard";

const BuscaDashBoard = (props) => {
    const {usuarioId} = useParams();
    const currentUsuarioId = sessionStorage.getItem('usuarioId');
    const currentUsuarioIdNumber = Number(currentUsuarioId);

    if(Number(usuarioId) !== currentUsuarioIdNumber) {
        return <NotFound />
    } else {
        const avaliacoes = props.avaliacoes.filter((avaliacao) => avaliacao.id_usuario === currentUsuarioIdNumber);
        console.log(avaliacoes);
        return <Dashboard avaliacoes={avaliacoes} />  
    }
};

export default BuscaDashBoard;