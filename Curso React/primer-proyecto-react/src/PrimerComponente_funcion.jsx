//Tipos de datos que podemos usar
const string = "Esto es un texto";
const number = 123456;
const array = ["Curso de React", "Youtube", 4, 1000000];
const boolean = true;
const funcion = () => "Hello, esto es una función";
const fecha = new Date();
const set = new Set();
const objeto = {
  nombre: "Curso de Javascript",
  duracion: 4,
};

//Componente de función atajo rafc
export const PrimerComponente_funcion = () => {
  return (
    //Dentro de las llaves {} se puede poner código Javascript
    //Nota: Las expresiones jsx sólo pueden tener un padre, se podría poner como padre cualquier etiqueta como div o body, pero
    //también podríamos utilizar las <></>
    <>
      <h1>{string}</h1>
      <h1>{number}</h1>
      <h1>{array}</h1>
      <h1>{boolean}</h1> {/*No se va a mostrar*/}
      <h1>{funcion}</h1> {/*No se muestra*/}
      <h1>{funcion()}</h1> {/*Si se muestra*/}
      {/*Los objetos como nuestra variable objeto, set o fecha, no se muestran y generan error.*/}
      {/*No obstante si hay una forma de hacer que los objetos aparezcan renderizados*/}
      <h1>{JSON.stringify(objeto)}</h1>
      <h1>{JSON.stringify(fecha)}</h1>
      <h1>{JSON.stringify(set)}</h1>
    </>
    //También podríamos usar Fragment: <Fragment></Fragment>
  );
};
