import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useLogin = () => {
  const { mutateAsync, error } = useMutation({
    onSuccess: (responseData) => {
      const { access_token, refresh_token } = responseData.data;

      if (access_token && refresh_token) {
        localStorage.setItem("jwtAccessToken", access_token);
        localStorage.setItem("jwtRefreshToken", refresh_token);
      }
    },
    mutationFn: (values: any) =>
      axios.post("oauth/token", {
        grant_type: "client_credentials",
        username: values.name,
        password: values.password,
      }),
  });

  return mutateAsync;
};
