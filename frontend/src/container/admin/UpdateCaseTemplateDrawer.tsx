import { useQuery } from "@apollo/react-hooks";
import { Drawer, Spin } from "antd";
import CaseTemplateForm from "container/admin/CaseTemplateForm";
import Error from "presentational/shared/errors/Error";
import GET_ONE_CASE_TEMPLATE from "queries/getOneCaseTemplate";
import React from "react";
import ICaseTemplate from "ts/interfaces/ICaseTemplate";

interface Props {
  visible: boolean;
  handleClose: () => void;
  templateId: number | null /* ID of the case template to show. */;
}

interface OneTemplateData {
  caseTemplate: ICaseTemplate;
}

function UpdateCaseTemplateDrawer({ visible, handleClose, templateId }: Props) {
  const { loading, error, data } = useQuery<OneTemplateData>(
    GET_ONE_CASE_TEMPLATE,
    {
      variables: {
        id: templateId
      }
    }
  );

  let drawerContent: React.ReactNode = null;
  if (loading) drawerContent = <Spin />;
  else if (error) {
    drawerContent = (
      <Error
        title="Couldn't retrieve template"
        subtitle={error ? error.message : ""}
      />
    );
  } else if (data) {
    drawerContent = (
      <CaseTemplateForm
        handleClose={handleClose}
        submitText="Update Template"
      />
    );
  }

  return (
    <Drawer
      visible={visible}
      title={<h3>Update a case template</h3>}
      width={600}
      maskClosable={false}
      keyboard={false}
      onClose={handleClose}
    >
      {drawerContent}
    </Drawer>
  );
}

export default UpdateCaseTemplateDrawer;
