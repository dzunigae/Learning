function handle_click(event,valor) {
  valor += 1;
  console.log(valor);
}

const Button = ({valor}) => {
  //event es un dato especial que resume toda la información relevante de la acción en cuestión
  return <button onClick={(event) => handle_click(event,valor)}>Soy un botón</button>;
};

export const ContadorApp = ({value}) => {
  return (
    <>
      <h1>Contador: </h1>
      <p>{value}</p>
      <Button valor={value}></Button>
    </>
  );
};
