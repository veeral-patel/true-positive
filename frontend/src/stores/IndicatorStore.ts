import { notification } from "antd";
import { ApolloError } from "apollo-boost";
import client from "createApolloClient";
import { action, observable, runInAction } from "mobx";
import GET_INDICATORS from "queries/getIndicators";
import IIndicator from "ts/interfaces/IIndicator";

interface IndicatorData {
  indicators: IIndicator[];
}

class IndicatorStore {
  @observable indicators: IIndicator[] = [];
  @observable indicatorsAreLoading: boolean = false;

  @action.bound
  loadIndicators() {
    this.indicatorsAreLoading = true;
    client
      .query<IndicatorData>({
        query: GET_INDICATORS
      })
      .then(response => {
        runInAction(() => {
          if (response.data) this.indicators = response.data.indicators;
        });
      })
      .catch((error: ApolloError) => {
        notification.error({
          message: "An error occurred while fetching indicators",
          description: error.message
        });
        runInAction(() => (this.indicators = []));
      })
      .finally(() => runInAction(() => (this.indicatorsAreLoading = false)));
  }
}

export default IndicatorStore;
