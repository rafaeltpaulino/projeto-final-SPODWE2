import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


const ReceitaCompleta = (props) => {
    return (
        <div className="principal">
        <header className="receita-header">
        <h1 className="receita-titulo-principal">{props.receita.nome}</h1>
        <div className="receita-meta-dados">
            <span>📁 <strong>Categoria:</strong> {props.receita.categoria}</span>
            <span>✍️ <strong>Por:</strong> {props.receita.autor}</span>
            <span>⏱️ <strong>Preparo:</strong> {props.receita.tempo}</span>
        </div>
        </header>

        <hr className="receita-divisor" />

        {/* Seções de Conteúdo */}
        <section className="receita-secao">
        <h3>📋 Ingredientes</h3>
        <p className="text-quebra-linha receita-texto">{props.receita.ingredientes}</p>
        </section>

        <section className="receita-secao">
        <h3>🍳 Modo de Preparo</h3>
        <p className="text-quebra-linha receita-texto">{props.receita.descricao}</p>
        </section>
    </div>
    );
};

export default ReceitaCompleta;