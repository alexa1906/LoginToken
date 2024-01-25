import axios from "axios";
import api from "../axios";

const setTokensInLocalStorage = (accessToken: string, refreshToken: string) => {
  localStorage.setItem("jwtAccessToken", accessToken);
  localStorage.setItem("jwtRefreshToken", refreshToken);
};

export const fetchUserInfo = () => {
  console.log("Fetching user info");
  return api.get("/me");
};

export const refresh = () => {
  return axios
    .post("oauth/token", {
      grant_type: "refresh_token",
      refresh_token: localStorage.getItem("jwtRefreshToken"),
    })
    .then((refreshResponse) => {
      const newAccessToken = refreshResponse.data.access_token;
      const newRefreshToken = refreshResponse.data.refresh_token;

      // Update tokens in localStorage
      if (newAccessToken && newRefreshToken) {
        setTokensInLocalStorage(newAccessToken, newRefreshToken);
      }

      console.log("logged with refresh token");
      return refreshResponse;
    })
    .catch((error) => {
      console.error("Refresh failed:", error);
      window.location.assign("/");
    });
};

export const fetchCompanies = () => {
  console.log("Fetching companies info");
  return api.get("/companies");
};

export const fetchCertificateTypes = () => {
  console.log("Fetching certificate types");
  return api.get("/certificate-types");
};

export const fetchCertificates = () => {
  console.log("Fetching certificates");
  return api
    .get("/companies/c6c3681adf1c4ec1898333ce18e45267/certificates")
    .then((certificatesResponse: any) => {
      console.log(certificatesResponse.data);
    })
    .catch((error: any) => {
      console.log("Fetching certificate failed:", error);
    });
};
