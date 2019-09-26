import client from "createApolloClient";
import jwt from "jsonwebtoken";

class AuthStore {
  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
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
    return localStorage.getItem("JWT_TOKEN");
  }

  logout() {
    // delete our token
    localStorage.removeItem("JWT_TOKEN");

    // clear our local cache
    client.resetStore();

    // refresh the page
    window.location.reload();
  }
}

export default AuthStore;
