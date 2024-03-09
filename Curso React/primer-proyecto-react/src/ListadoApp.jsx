const Items_1 = ({ nombre, visto }) => {
  return (
    <li>
      {nombre}
      {/*Emojis con la tecla windows + .*/}
      {/*Esto es un condicional ternario en Javascript*/}
      {visto ? "😍" : "😔"}
    </li>
  );
};

const Items_2 = ({ nombre, visto }) => {
  return (
    <li>
      {nombre}
      {/*Emojis con la tecla windows + .*/}
      {/*Aquí las condiciones se van dando de forma anidada, se la primera no se cumple, no se mostrará lo siguiente*/}
      {visto && "😍"}
    </li>
  );
};

export const ListadoApp = () => {
  return (
    <>
      <h1>Listado de Temas del Curso</h1>
      <br />
      <h2>
        Condicional ternario para hacer aparecer emojis según visto sea true o
        false
      </h2>
      <ol>
        <Items_1 nombre="Instalaciones necesarias" visto={true}></Items_1>
        <Items_1 nombre="Uso de Vite" visto={true}></Items_1>
        <Items_1 nombre="Componentes" visto={true}></Items_1>
        <Items_1 nombre="Variables en JSX" visto={true}></Items_1>
        <Items_1 nombre="Props" visto={true}></Items_1>
        <Items_1 nombre="Eventos" visto={true}></Items_1>
        <Items_1 nombre="useState" visto={true}></Items_1>
        <Items_1 nombre="Redux" visto={false}></Items_1>
        <Items_1 nombre="customHooks" visto={false}></Items_1>
      </ol>
      <br />
      <h2>
        Condicional ternario para hacer que los emojis aparezcan según visto
        sea true o false
      </h2>
      <ol>
        <Items_2 nombre="Instalaciones necesarias" visto={true}></Items_2>
        <Items_2 nombre="Uso de Vite" visto={true}></Items_2>
        <Items_2 nombre="Componentes" visto={true}></Items_2>
        <Items_2 nombre="Variables en JSX" visto={true}></Items_2>
        <Items_2 nombre="Props" visto={true}></Items_2>
        <Items_2 nombre="Eventos" visto={true}></Items_2>
        <Items_2 nombre="useState" visto={true}></Items_2>
        <Items_2 nombre="Redux" visto={false}></Items_2>
        <Items_2 nombre="customHooks" visto={false}></Items_2>
      </ol>
    </>
  );
};
