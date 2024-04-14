import PropTypes from 'prop-types'

export const SegundoComponente_funcion = ({ titulo, subtitulo, numero, vacio, otra_forma_default="Esta es otra forma de tener un valor default en caso que no venga el dato." }) => {
  //Las props son mecanismos para pasar información de un componente padre a un componente hijo
  console.log(titulo);
  console.log(subtitulo);
  console.log(typeof numero)
  console.log(typeof vacio)

  return (
    <>
      <h1>{titulo}</h1>
      <h2>{subtitulo}</h2>
      <h3>{numero*numero}</h3>
      <h4>{vacio}</h4>
      <h5>{otra_forma_default}</h5>
    </>
  );
};

//Características que le podemos poner a las props, como su tipo o si son requeridas
SegundoComponente_funcion.PropTypes = {
  titulo: PropTypes.string.isRequired,
  subtitulo: PropTypes.string.isRequired,
  numero: PropTypes.number.isRequired,
  vacio: PropTypes.number.isRequired
}

//Valores por defecto en caso de que algún dato no llegue a venir desde el padre
SegundoComponente_funcion.defaultProps = {
  titulo: "Uso de React",
  subtitulo: "Sección de props",
  numero: 66,
  vacio: 0
}