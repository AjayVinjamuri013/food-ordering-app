//This is a custom hook only for fetching if the current user is admin or not
import { useEffect, useState } from "react";

export function useProfile() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('api/profile').then(response => {
      response.json().then(data => {
        setData(data)
        setLoading(false);
      })
    })
  }, [])

  return {data, loading};
}