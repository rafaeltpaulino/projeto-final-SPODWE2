import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


function ReceitaCompleta(){
    const {id} = useParams();
    const [receita, setReceita] = useState(null);
    
    useEffect(() => {
        fetch("api/receitas.json")
        .then((response) => response.json())
        .then((data) => {
            const receitaEncontrada = data.find(
                (r) => r.id === parseInt(id)
            );

            setReceita(receitaEncontrada);
            })
            .catch((error) =>
            console.error("Erro:", error)
        );
}, [id]);

    if (!receita) {
        return <p>Carregando...</p>;
    }

    return (
        <main className="pagina-receita-container">
        <header className="receita-header">
        <h1 className="receita-titulo-principal">{receita.nome}</h1>
        <div className="receita-meta-dados">
            <span>📁 <strong>Categoria:</strong> {receita.categoria}</span>
            <span>✍️ <strong>Por:</strong> {receita.autor}</span>
            <span>⏱️ <strong>Preparo:</strong> {receita.tempo}</span>
        </div>
        </header>

        <hr className="receita-divisor" />

        {/* Seções de Conteúdo */}
        <section className="receita-secao">
        <h3>📋 Ingredientes</h3>
        <p className="text-quebra-linha receita-texto">{receita.ingredientes}</p>
        </section>

        <section className="receita-secao">
        <h3>🍳 Modo de Preparo</h3>
        <p className="text-quebra-linha receita-texto">{ receita.descricao}</p>
        </section>
    </main>
    );
}

export default ReceitaCompleta;