import React, { useState } from "react";
import CardReceita from "./CardReceita";
import Carrossel from "./Carrossel";

const Home = (props) => {
  const [pesquisa, setPesquisa] = useState('');

  const receitasFiltradas = props.receitas.filter((receita) =>
    receita.nome.toLowerCase().includes(pesquisa.toLowerCase())
  );

  return (
    <main className="principal">
      <h2>Bem-vindo(a) ao Compartilhamento de Receitas!</h2>
      <p>Seja bem-vindo ao nosso espaço gastronômico! Mais do que um simples sistema de gerenciamento, 
        este é o seu novo caderno de receitas digital — um lugar feito para guardar aqueles segredos culinários 
        que passam de geração em geração, as descobertas de novos sabores e os pratos que reúnem a família ao redor 
        da mesa.</p>
      <p>
        Cozinhar é misturar técnica com sentimento. Por isso, criamos esta plataforma para que você possa organizar 
        suas inspirações diárias, planejar seus jantares especiais e ter sempre à mão o passo a passo daquela sobremesa 
        inesquecível ou do prato principal perfeito.</p>
      <p>Portanto vamos começar! Utilize o menu acima para gerenciar as Receitas, Categorias e Usuários do sistema.</p>

      <p>Dê uma olhada nas receitas mais bem avaliadas do site abaixo!</p>

      <Carrossel receitas={props.receitas} />

      <div className="busca-container">
        <input
          type="text"
          placeholder="Digite aqui a receita desejada..."
          value={pesquisa}
          onChange={(e) => setPesquisa(e.target.value)}
          className="input-busca"
        />
      </div>
      
      <div className="cards-container">
        {receitasFiltradas.length > 0 ? (
          receitasFiltradas.map((receita) => (
            <CardReceita key={receita.id} receita={receita} />
          ))
        ) : (
          <p className="texto-alerta-vazio">
            Receita não encontrada.
          </p>
        )}
      </div>
    </main>
  );
};

export default Home;
