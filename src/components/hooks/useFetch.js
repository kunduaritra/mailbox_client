import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log("fetching from custom hook");
      try {
        const res = await fetch(url);
        const resData = await res.json();
        const updatedData = Object.entries(resData).map(([key, value]) => ({
          id: key,
          ...value,
        }));
        setData(updatedData);
      } catch (err) {
        alert(err);
      }
    };
    fetchData();
  }, [url]);

  return data;
};

export default useFetch;
