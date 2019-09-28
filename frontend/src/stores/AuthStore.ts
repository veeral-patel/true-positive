import { notification } from "antd";
import axios from "axios";
import client from "createApolloClient";
import jwt from "jsonwebtoken";
import { action } from "mobx";
import { JWT_TOKEN_KEY } from "utils/constants";

interface Response {
  session: SessionData;
}

interface SessionData {
  username: string;
  jwt: string;
}

class AuthStore {
  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  @action.bound
  login(username: string, password: string) {
    axios
      .post<Response>(`${process.env.REACT_APP_API_ENDPOINT}/session/`, {
        session: {
          username,
          password
        }
      })
      .then(response => {
        // set the JWT we receive in localstorage
        this.setToken(response.data.session.jwt);

        // refresh the page
        window.location.reload();
      })
      .catch(err => {
        notification.error({
          message: "Could not log in",
          description: "Either your username or your password is incorrect"
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

  setToken(jwt: string) {
    localStorage.setItem(JWT_TOKEN_KEY, jwt);
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
