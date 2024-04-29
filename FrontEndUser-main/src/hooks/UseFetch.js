import { useEffect, useState } from "react";

export default function UseFetch(url, OPTIONS = {}) {
  const [newData, setData] = useState([]);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setError(undefined);
    setIsLoading(true);

    const abortController = new AbortController();
    const signal = abortController.signal;

    fetch(url, { ...OPTIONS, signal })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed To Fetch");
        }
        return res.json();
      })
      .then((data) => setData(() => data))
      .catch((e) => {
        if (e?.name !== "AbortError") setError(e.message);
      })
      .finally(() => {
        setIsLoading(() => false);
      });

    return () => abortController.abort();
  }, [url, OPTIONS]);

  return { isLoading, error, newData };
}
