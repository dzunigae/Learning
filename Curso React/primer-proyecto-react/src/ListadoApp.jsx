import { useState } from "react";
import { AgregarTarea } from "./components/AgregarTarea";

const addTask = (arreglo,setArreglo) => {
  setArreglo([...arreglo, {nombre: 'Nuevo', visto: false}])
}

const Items_1 = ({ nombre, visto }) => {
  return (
    <li className="rojito">
      {nombre}
      {/*Emojis con la tecla windows + .*/}
      {/*Esto es un condicional ternario en Javascript*/}
      {visto ? "😍" : "😔"}
    </li>
  );
};

const Items_2 = ({ nombre, visto }) => {
  return (
    <li className="rojito">
      {nombre}
      {/*Emojis con la tecla windows + .*/}
      {/*Aquí las condiciones se van dando de forma anidada, se la primera no se cumple, no se mostrará lo siguiente*/}
      {visto && "😍"}
    </li>
  );
};

export const ListadoApp = () => {
  let listadoSecciones = [
    { nombre: "Instalaciones necesarias", visto: true },
    { nombre: "Uso de Vite", visto: true },
    { nombre: "Componentes", visto: true },
    { nombre: "Variables en JSX", visto: true },
    { nombre: "Props", visto: true },
    { nombre: "Eventos", visto: true },
    { nombre: "useState", visto: true },
    { nombre: "Redux", visto: false },
    { nombre: "customHooks", visto: false },
  ];

  const [arreglo, setArreglo] = useState(listadoSecciones);

  return (
    <>
      <h1>Listado de Temas del Curso</h1>
      <br />
      <AgregarTarea></AgregarTarea>
      <br />
      <h2>
        Condicional ternario para hacer aparecer emojis según visto sea true o
        false
      </h2>
      <ol>
        {/*Key es necesario porque react exige que en estos casos, cada elemento generado de esta forma tenga identificadores únicos.*/}
        {arreglo.map((item) => (
          <Items_1
            key={item.nombre}
            nombre={item.nombre}
            visto={item.visto}
          ></Items_1>
        ))}
      </ol>
      <br />
      <h2>
        Condicional ternario para hacer que los emojis aparezcan según visto sea
        true o false
      </h2>
      <ol>
        {/*Key es necesario porque react exige que en estos casos, cada elemento generado de esta forma tenga identificadores únicos.*/}
        {arreglo.map((item) => (
          <Items_2
            key={item.nombre}
            nombre={item.nombre}
            visto={item.visto}
          ></Items_2>
        ))}
      </ol>
    </>
  );
};
