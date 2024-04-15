export const fetchdata = async (endpoint) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/${endpoint}`
      );
      const data = await response.json();
      return {
        data, 
        isLoading: false
      }
    } catch (error) {
      console.log(error);
    }
  };
