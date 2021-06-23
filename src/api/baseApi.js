import axios from "axios";
import { handleErrors, handleErrorsArray } from "../handlers/errorHandler";

const baseURL =
  process.env.NODE_ENV === "development" && "http://localhost:7000";

const instance = axios.create({
  baseURL,
  withCredentials: true,
  crossDomain: true,
});

export const get = async (url) => {
  return await instance.get(url).catch((e) => {
    if (e.response) {
      if (e.response && e.response.data.errors) {
        const errors = handleErrorsArray(e.response.data.errors);

        return errors;
      }

      return handleErrors(e.response.data.error);
    }
  });
};

export const post = async (url, data) => {
  return await instance.post(url, data).catch((e) => {
    if (e.response) {
      if (e.response && e.response.data.errors) {
        const errors = handleErrorsArray(e.response.data.errors);

        return errors;
      }

      return handleErrors(e.response.data.error);
    }
  });
};

export const put = async (url, data) => {
  return await instance.put(url, data).catch((e) => {
    if (e.response) {
      if (e.response && e.response.data.errors) {
        const errors = handleErrorsArray(e.response.data.errors);

        return errors;
      }

      return handleErrors(e.response.data.error);
    }
  });
};

export const destroy = async (url, data) => {
  return await instance.delete(url, data).catch((e) => {
    if (e.response) {
      if (e.response && e.response.data.errors) {
        const errors = handleErrorsArray(e.response.data.errors);

        return errors;
      }

      return handleErrors(e.response.data.error);
    }
  });
};
