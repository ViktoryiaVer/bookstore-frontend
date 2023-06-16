import axios, { HttpStatusCode } from "axios";
import { doLogout } from "./authenticationService";

axios.interceptors.response.use(
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

function setJwt(jwt: string | undefined) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};
