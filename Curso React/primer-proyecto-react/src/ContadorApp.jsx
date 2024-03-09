import { useState } from "react";

function handle_click(contador, setContador) {
  setContador(contador + 1);
}

const Button = ({ contador, setContador }) => {
  return (
    <button onClick={() => handle_click(contador, setContador)}>
      Soy un botón
    </button>
  );
};

export const ContadorApp = ({ value }) => {
  const [contador, setContador] = useState(value)
  return (
    <>
      <h1>Contador: </h1>
      <p>{contador}</p>
      <Button contador={contador} setContador={setContador}></Button>
    </>
  );
};
