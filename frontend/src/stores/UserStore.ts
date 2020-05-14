import { notification } from "antd";
import { ApolloError, FetchResult } from "apollo-boost";
import client from "createApolloClient";
import { action, observable, runInAction } from "mobx";
import GET_USERS from "queries/getUsers";
import IUser from "ts/interfaces/IUser";

interface IUserData {
  users: IUser[];
}

class UserStore {
  @observable users: IUser[] = [];
  @observable usersAreLoading: boolean = false;

  @action.bound
  loadUsers() {
    this.usersAreLoading = true;
    client
      .query<IUserData>({
        query: GET_USERS
      })
      .then((response: FetchResult<IUserData>) => {
        runInAction(() => {
          if (response.data) this.users = response.data.users;
        });
      })
      .catch((error: ApolloError) => {
        notification.error({
          message: "An error occurred while fetching users",
          description: error.message
        });
        runInAction(() => (this.users = []));
      })
      .finally(() => runInAction(() => (this.usersAreLoading = false)));
  }
}

export default UserStore;
