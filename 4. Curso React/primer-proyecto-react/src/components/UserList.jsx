import { useEffect, useState } from "react";

export const UserList = ({ endpoint }) => {
  const [data, setData] = useState([]);

  const fetchdata = async () => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/${endpoint}`
      );
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchdata()
  }, [endpoint])

  return (
    <>
      <ul>
        {endpoint == "users"
          ? data.map((item) => <li key={item.id}>{item.name}</li>)
          : data.map((item) => <li key={item.id}>{item.body}</li>)}
      </ul>
    </>
  );
};
