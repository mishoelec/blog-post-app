import { useState, useEffect } from "react";

export function useFetch(url) {
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setStatus("loading");
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result);
        setStatus("success");
      } catch (error) {
        setError(error);
        setStatus("error");
      }
    };

    fetchData();

    // Cleanup function (optional)
    return () => {
      // Cleanup logic if needed
    };
  }, [url]); // Dependency array ensures useEffect runs only when url changes

  return { data, error, status };
}
