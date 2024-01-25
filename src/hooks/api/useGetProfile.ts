import { useQuery } from "@tanstack/react-query";
import { fetchUserInfo } from "../../api/services/auth";

export const useGetProfile = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetchUserInfo(),
    refetchOnWindowFocus: false,
    staleTime: 10000
  });

  if (isLoading) {
    console.log("is loading");
  }

  if (error) {
    console.log(error);
  }


  return { isLoading, error, data };
};
