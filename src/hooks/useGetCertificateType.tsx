import { useQuery } from "@tanstack/react-query";
import { fetchCertificateTypes } from "../api/services/auth";

export const useGetCertificateType = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["type"],
    queryFn: () => fetchCertificateTypes(),
    refetchOnWindowFocus: false,
    // if request within 10 seconds of the last fetch, will return the cached data
    staleTime: 10000,
    select: (type) => {
        return type.data;
      },
  });

  if (isLoading) {
    console.log("is loading");
  }

  if (error) {
    console.log(error);
  }

  return { isLoading, error, data: data || [] };
};
