import decode from "jwt-decode";

class AuthStore {
  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token: string) {
    try {
      const date = new Date(0);
      const decoded: any = decode(token);
      date.setUTCSeconds(decoded.exp);
      return date.valueOf() > new Date().valueOf();
    } catch (err) {
      return false;
    }
  }

  getToken() {
    return localStorage.getItem("JWT_TOKEN");
  }
}

export default AuthStore;
