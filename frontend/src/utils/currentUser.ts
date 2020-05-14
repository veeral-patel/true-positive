import { USERNAME_KEY } from "utils/constants";

function getUsernameOfCurrentUser() {
  return localStorage.getItem(USERNAME_KEY);
}

export default getUsernameOfCurrentUser;
