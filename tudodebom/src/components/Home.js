import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CardReceita from "./CardReceita";

const Home = (props) => {
  const [expandido, setExpandido] = useState(false);
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

     <div className="cards-container">
        {props.receitas.map((receita) => (
          <CardReceita key={receita.id} receita={receita} />
        ))}
      </div>
    </main>
  );
}

export default Home;
