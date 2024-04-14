//El objetivo aquí es usar una API gratis de prueba desde la cual podamos consumir

import { useState, useEffect } from "react";
//import { UserList } from "./components/UserList.jsx";

export const UsersApp = () => {
  const [endPoint, setendPoint] = useState("users");

  const handleFetch = () => {
    setendPoint('comments');
  };

  //Ejecución de efectos secundarios de la modificación de una de las dependencias
  /*useEffect(() => {
    fetchUsers();
  }, []);*/

  return (
    <>
      <h1>Lista de usuarios:</h1>
      <UserList endPoint={endPoint}></UserList>
      <button onClick={handleFetch}>Llamar usuarios</button>
    </>
  );
};
