import { useState } from "react";

const onInputChange = (event, inputValue, setInputValue) => {
  setInputValue(event.target.value);
};

const onSubmit = (event, inputValue, agregarTarea) => {
  event.preventDefault();
  agregarTarea(inputValue);
};

export const AgregarTareaForma2 = ({ agregarTarea }) => {
  const [inputValue, setInputValue] = useState("");
  return (
    <form
      onSubmit={(event) => onSubmit(event, inputValue, agregarTarea)}
    >
      <input
        type="text"
        placeholder="Ingresar tarea"
        value={inputValue}
        onChange={(event) => onInputChange(event, inputValue, setInputValue)}
      />
    </form>
  );
};
