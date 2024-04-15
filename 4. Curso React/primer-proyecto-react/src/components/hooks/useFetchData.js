import { useState, useEffect } from "react";
import { fetchdata } from "../../helpers/fetchData";

export const useFetchData = (endpoint) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //Nota: Para que la función dentro del useEffect pueda ser asíncrona, esta debe declararse afuera del useEffect
  useEffect( () => {
    fetchdata(endpoint)
    .then(res => {
        setData(res.data)
        setIsLoading(res.isLoading)
    })
  }, [endpoint]);

  return {
    data,
    isLoading,
  };
};
