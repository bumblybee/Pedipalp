import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

export const pushToLogin = () => {
  history.push("/sign-in");
};
