import { notification } from "antd";
import { FetchResult } from "apollo-boost";
import axios from "axios";
import client from "createApolloClient";
import jwt from "jsonwebtoken";
import { action, observable, runInAction } from "mobx";
import GET_CURRENT_USER from "queries/getCurrentUser";
import IUser from "ts/interfaces/IUser";
import { JWT_TOKEN_KEY } from "utils/constants";

class AuthStore {
  @observable currentUser: IUser | null = null;

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  @action.bound
  login(username: string, password: string) {
    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}/session/`, {
        session: {
          username,
          password
        }
      })
      .then(response => console.log(response))
      .catch(err => {
        notification.error({
          message: "Could not log in",
          description: "Either your username or your password is incorrect"
        });
      });
  }

  @action.bound
  getCurrentUser() {
    client
      .query<IUser>({
        query: GET_CURRENT_USER
      })
      .then((response: FetchResult<IUser>) => {
        runInAction(() => {
          if (response.data) this.currentUser = response.data;
        });
      });
  }

  isTokenExpired(token: string) {
    try {
      const decoded = jwt.decode(token);
      if (decoded) {
        const expiry = (decoded as any).exp;
        const now = new Date();
        return now.getTime() > expiry * 1000;
      }
      return false;
    } catch (err) {
      return true;
    }
  }

  getToken() {
    return localStorage.getItem(JWT_TOKEN_KEY);
  }

  logout() {
    // delete our token
    localStorage.removeItem(JWT_TOKEN_KEY);

    // clear our local cache
    client.resetStore();

    // refresh the page
    window.location.reload();
  }
}

export default AuthStore;
