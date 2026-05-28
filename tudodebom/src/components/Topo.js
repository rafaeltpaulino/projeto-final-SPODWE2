import React, { useState, useEffect } from "react";
import Navegacao from "./Navegacao";
import Logo from "./Logo";

const Topo = (props) => {
  const [rolagem, setRolagem] = useState(false);

  useEffect(() => {
   const lidarComRolagem = () => {
      if (window.scrollY > 100) {
        setRolagem(true); 
      } else if (window.scrollY < 50) {
        setRolagem(false);
      }
    };

    window.addEventListener('scroll', lidarComRolagem);
        return () => {
      window.removeEventListener('scroll', lidarComRolagem);
    };
  }, []);

  return (
    <header className={`topo ${rolagem ? 'topo-scroll' : ''}`}>
      <Logo />
      <Navegacao logado={props.logado}/>
    </header>
  );
};

export default Topo;
