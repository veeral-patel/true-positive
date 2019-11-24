import { useQuery } from "@apollo/react-hooks";
import { Drawer, Spin } from "antd";
import ErrorP from "presentational/shared/errors/ErrorP";
import GET_ONE_TASK_TEMPLATE from "queries/getOneTaskTemplate";
import React from "react";
import ITaskTemplate from "ts/interfaces/ITaskTemplate";

interface OneTemplateData {
  taskTemplate: ITaskTemplate;
}

interface Props {
  /* Whether to render this drawer. */
  isOpen: boolean;

  /* Callback to close this drawer. */
  handleClose: () => void;

  /* ID of the task template to show. */
  templateId: number | null;
}

function TaskTemplateDrawer(props: Props) {
  const { isOpen, handleClose, templateId } = props;

  /* retrieve this template's existing information. */
  const { loading, error, data } = useQuery<OneTemplateData>(
    GET_ONE_TASK_TEMPLATE,
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
      <ErrorP
        title="Couldn't retrieve template"
        subtitle="Ensure your Internet connection is working"
      />
    );
  }

  return (
    <Drawer
      title="Edit task template"
      visible={isOpen}
      onClose={handleClose}
      width={500}
      maskClosable={false}
    >
      {drawerContent}
    </Drawer>
  );
}

export default TaskTemplateDrawer;
