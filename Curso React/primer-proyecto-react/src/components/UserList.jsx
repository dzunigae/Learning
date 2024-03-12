import { useEffect } from "react";

export const UserList = ({ endPoint }) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/${endPoint}`
      );
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endPoint]);

  return (
    <ul>
      {endPoint == "users"
        ? data.map((item) => <li key={item.id}>{item.name}</li>)
        : data.map((item) => <li key={item.id}>{item.body}</li>)}
    </ul>
  );
};
