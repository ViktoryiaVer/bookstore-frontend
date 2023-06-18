import axios, { HttpStatusCode } from "axios";
import { doLogout } from "./authenticationService";
import Cookies from "js-cookie";

const httpService = axios.create({
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${Cookies.get("token")}`,
  },
});

httpService.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === HttpStatusCode.Unauthorized) {
      const { message } = error.response.data as { message: string };
      if (message.startsWith("JWT")) {
        doLogout();
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default httpService;
