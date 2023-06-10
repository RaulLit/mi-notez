import { useQuery } from "@tanstack/react-query";

export const useFetch = (url, key) => {
  const { data, isLoading, error, refetch } = useQuery([key], async () => {
    return fetch(url).then((res) => res.json());
  });

  return { data, isLoading, error, refetch };
};
