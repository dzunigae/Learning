import { useState } from "react";

const onInputChange = (event, inputValue, setInputValue) => {
  setInputValue(event.target.value);
};

const onSubmit = (event,inputValue) => {
    event.preventDefault();
    alert(inputValue);
}

export const AgregarTarea = () => {
  const [inputValue, setInputValue] = useState("");
  return (
    <form onSubmit={(event) => onSubmit(event,inputValue)}>
      <input
        type="text"
        placeholder="Ingresar tarea nueva"
        value={inputValue}
        onChange={(event) => onInputChange(event, inputValue, setInputValue)}
      />
    </form>
  );
};
