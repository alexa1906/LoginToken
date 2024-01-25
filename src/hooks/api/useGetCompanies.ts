import { useQuery } from "@tanstack/react-query";
import { fetchCompanies } from "../../api/services/auth";

export const useGetCompanies = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["companie"],
    queryFn: () => fetchCompanies(),
    refetchOnWindowFocus: false,
    select: (companies) => {
      return companies.data.content.flatMap((company: { createdBy: any }) => [
        { ...company },
        { ...company.createdBy },
      ]);
    },
    // if request within 10 seconds of the last fetch, will return the cached data
    staleTime: 10000
  });

  if (isLoading) {
    console.log("is loading");
  }

  if (error) {
    console.log(error);
  }

  return { isLoading, error, data: data || [] };
};
