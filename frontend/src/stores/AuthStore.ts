import jwt from "jsonwebtoken";

class AuthStore {
  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token: string) {
    const decoded = jwt.decode(token);
    if (decoded) {
      const expiry = (decoded as any).exp;
      const now = new Date();
      return now.getTime() > expiry * 1000;
    }
    return false;
  }

  getToken() {
    return localStorage.getItem("JWT_TOKEN");
  }
}

export default AuthStore;
