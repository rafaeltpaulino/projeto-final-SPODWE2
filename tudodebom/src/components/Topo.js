import React from "react";
import Navegacao from "./Navegacao";
import Logo from "./Logo";

const Topo = () => {
  return (
    <header className="topo">
      <Logo />
      <Navegacao/>
    </header>
  );
}

export default Topo;