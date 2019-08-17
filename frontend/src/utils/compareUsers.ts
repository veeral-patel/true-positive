import IUser from "ts/interfaces/IUser";

function compareUsers(u1: IUser | null, u2: IUser | null): number {
  // sort unassigned cases before assigned cases
  if (!u1 && u2) return -1;
  else if (u1 && !u2) return 1;
  // if two cases are unassigned, sort them equally
  else if (!u1 && !u2) return 0;
  // if both cases are assigned
  else {
    // then sort based on the assigned user's username
    if (u1 && u2) return u1.username.localeCompare(u2.username);
    // this should never happen
    else return 0;
  }
}

export default compareUsers;
