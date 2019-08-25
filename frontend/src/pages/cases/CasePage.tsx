import { RouteComponentProps, Router } from "@reach/router";
import { Layout, notification } from "antd";
import CaseSider from "container/one_case/CaseSider";
import HandleErrorAndLoading from "container/one_case/HandleErrorAndLoading";
import Indicators from "container/one_case/Indicators";
import Info from "container/one_case/Info";
import Members from "container/one_case/Members";
import Tasks from "container/one_case/Tasks";
import { inject, observer } from "mobx-react";
import Page404 from "pages/shared/Page404";
import TreeP from "presentational/one_case/TreeP";
import React from "react";
import ActiveCaseStore from "stores/ActiveCaseStore";

interface ICasePageProps extends RouteComponentProps {
  caseId?: number;
  activeCaseStore?: ActiveCaseStore;
}

class CasePage extends React.Component<ICasePageProps> {
  componentDidMount() {
    const { activeCaseStore, caseId } = this.props;
    if (caseId) {
      activeCaseStore!.setActiveCaseId(caseId);
    } else {
      notification.error({
        message: "Unable to extract caseId from the URL",
        description: "Check if you're on a valid URL"
      });
    }
  }

  componentWillUnmount() {
    const { activeCaseStore, caseId } = this.props;
    if (caseId) {
      activeCaseStore!.setActiveCaseId(null);
    }
  }

  render() {
    return (
      <Layout>
        <CaseSider />
        <Layout style={{ padding: "0 24px 24px" }}>
          <HandleErrorAndLoading>
            <Router>
              <Info path="/" />
              <Info path="/info" />
              <TreeP path="/tree" />
              <Members path="/members" />
              <Indicators path="/indicators" />
              <Tasks path="/tasks" />
              <Page404 default showBackButton={false} />
            </Router>
          </HandleErrorAndLoading>
        </Layout>
      </Layout>
    );
  }
}

export default inject("activeCaseStore")(observer(CasePage));
