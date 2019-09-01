import { notification } from "antd";
import { ApolloError, ApolloQueryResult } from "apollo-boost";
import client from "createApolloClient";
import { action, observable, runInAction } from "mobx";
import GET_TAGS from "queries/getTags";
import ITag from "ts/interfaces/ITag";

interface ITagData {
  tags: ITag[];
}

class TagStore {
  @observable tags: ITag[] = [];
  @observable tagsAreLoading: boolean = false;

  @action.bound
  loadTags() {
    this.tagsAreLoading = true;
    client
      .query<ITagData>({
        query: GET_TAGS
      })
      .then((response: ApolloQueryResult<ITagData>) =>
        runInAction(() => (this.tags = response.data.tags))
      )
      .catch((error: ApolloError) => {
        notification.error({
          message: "An error occurred while fetching tags",
          description: error.message
        });
        runInAction(() => (this.tags = []));
      })
      .finally(() => runInAction(() => (this.tagsAreLoading = false)));
  }
}

export default TagStore;
