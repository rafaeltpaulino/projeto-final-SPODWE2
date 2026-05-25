import { useEffect } from 'react';


const MinhasAvaliacoes = (props) => {
    useEffect(() => {
        console.log('Teste minha avaliações');
        console.log(props.avaliacoes);
    }, [props.avaliacoes]);
    
    return (
        <div className='avaliacoes'>
            <h2>
                Minhas Avaliações
            </h2>
            {props.avaliacoes.map((a) => (
                <div key={a.id} className='avaliacao'>
                    <div className='nome-usuario'>
                        {a.nome_usuario}
                    </div>
                    <div className='nota'>
                        {a.nota}
                    </div>
                    <div className='data'>
                        {a.data_avaliacao}
                    </div>
                    <div className='comentario'>
                        {a.comentario}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MinhasAvaliacoes;