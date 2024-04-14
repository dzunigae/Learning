import { useEffect, useState } from "react";
import { UserList } from "./components/UserList";

export const UsersApp = () => {

  const [endpoint, setendpoint] = useState('users')

  const handleFetch = () => {
    if(endpoint == 'users'){
      setendpoint('comments')
    }else{
      setendpoint('users')
    }
  };

  //useEffect( () => {
  //  fetchUsers()
  //}, [] )

  return (
    <>
      <h1>Lista de usuarios: </h1>
      <UserList endpoint={endpoint}></UserList>
      <button onClick={handleFetch}>Aquí se llama la API</button>
    </>
  );
};
