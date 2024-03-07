import React from "react";
import ReactDOM from "react-dom/client";
//import { PrimerComponente_funcion } from "./PrimerComponente_funcion";
//import { SegundoComponente_funcion } from "./SegundoComponente_funcion";
import { ContadorApp } from "./ContadorApp";
//Importación de los estilos para toda la app
import "./styles/styles.css";

//Tener en cuenta que Main es el padre de los componentes dentro de la etiqueta React.StrictMode
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/*<PrimerComponente_funcion />*/}
    {/*<SegundoComponente_funcion
      titulo="Esta sección es de props"
      subtitulo="Curso de React"
      numero={4}
      //vacio={6342}
      otra_forma_default="No default"
      />*/}
    <ContadorApp value={0} />
  </React.StrictMode>
);
