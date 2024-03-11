import { useState } from "react";
import { AgregarTareaForma1 } from "./components/AgregarTareaForma1";
import { AgregarTareaForma2 } from "./components/AgregarTareaForma2";

const addTask = (arreglo, setArreglo) => {
  setArreglo([...arreglo, { nombre: "Nuevo", visto: false }]);
};

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
    { id: 1, nombre: "Instalaciones necesarias", visto: true },
    { id: 2, nombre: "Uso de Vite", visto: true },
    { id: 3, nombre: "Componentes", visto: true },
    { id: 4, nombre: "Variables en JSX", visto: true },
    { id: 5, nombre: "Props", visto: true },
    { id: 6, nombre: "Eventos", visto: true },
    { id: 7, nombre: "useState", visto: true },
    { id: 8, nombre: "Redux", visto: false },
    { id: 9, nombre: "customHooks", visto: false },
  ];

  const [arreglo, setArreglo] = useState(listadoSecciones);

  const onAgregarTarea = (val) => {
    //Para eliminar posibles espacios vacíos al comienzo y al final
    let valor = val.trim()

    if (valor < 1) return;

    const envio = {
      id: arreglo.length + 1,
      nombre: val,
      visto: false,
    };

    setArreglo([...arreglo, envio]);
  };

  return (
    <>
      <h1>Listado de Temas del Curso</h1>
      <br />
      {/*Esta es una forma de agregar tareas*/}
      <h3>Ingresar tareas forma 1</h3>
      <AgregarTareaForma1 agregarTarea={setArreglo}></AgregarTareaForma1>
      {/*Esta es otra forma de agregar tareas*/}
      <h3>Ingresar tareas forma 2</h3>
      <AgregarTareaForma2 agregarTarea={onAgregarTarea}></AgregarTareaForma2>
      <br />
      <h2>
        Condicional ternario para hacer aparecer emojis según visto sea true o
        false
      </h2>
      <ol>
        {/*Key es necesario porque react exige que en estos casos, cada elemento generado de esta forma tenga identificadores únicos.*/}
        {arreglo.map((item) => (
          <Items_1
            key={item.id}
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
            key={item.id}
            nombre={item.nombre}
            visto={item.visto}
          ></Items_2>
        ))}
      </ol>
    </>
  );
};
