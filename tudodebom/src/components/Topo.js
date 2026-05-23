import React from "react";
import Navegacao from "./Navegacao";
import Logo from "./Logo";

const Topo = (props) => {
  return (
    <header className="topo">
      <Logo />
      <Navegacao logado={props.logado}/>
    </header>
  );
};

export default Topo;