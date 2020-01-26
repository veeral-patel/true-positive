import { PlusOutlined } from "@ant-design/icons";
import { useQuery } from "@apollo/react-hooks";
import { Button, Empty, Spin, Typography } from "antd";
import CreateTaskTemplateDrawer from "container/admin/CreateTaskTemplateDrawer";
import ListofTaskTemplates from "container/admin/ListofTaskTemplates";
import Error from "presentational/shared/errors/Error";
import GET_TASK_TEMPLATES from "queries/getTaskTemplates";
import React, { useState } from "react";
import ITaskTemplate from "ts/interfaces/ITaskTemplate";

const { Paragraph } = Typography;

// ---

interface TaskTemplateData {
  taskTemplates: ITaskTemplate[];
}

function CustomizeTaskTemplates() {
  const { loading, data, error } = useQuery<TaskTemplateData>(
    GET_TASK_TEMPLATES
  );
  const [openDrawer, setOpenDrawer] = useState<"CREATE_TASK_TEMPLATE" | null>(
    null
  );

  if (loading) return <Spin />;
  else if (data) {
    return (
      <>
        {data.taskTemplates.length === 0 ? (
          <Empty
            description={
              <div style={{ marginTop: "1em" }}>
                <h3>No task templates</h3>
                <Paragraph>
                  Create task templates to scaffold tasks in case templates.
                </Paragraph>
                <Button
                  icon={<PlusOutlined />}
                  onClick={() => setOpenDrawer("CREATE_TASK_TEMPLATE")}
                >
                  Create task template
                </Button>
              </div>
            }
          />
        ) : (
          <>
            <Paragraph style={{ marginBottom: "0.5em" }}>
              Create task templates to scaffold tasks in case templates.
            </Paragraph>
            <Button
              type="link"
              style={{ paddingLeft: 0 }}
              onClick={() => setOpenDrawer("CREATE_TASK_TEMPLATE")}
            >
              Create Template
            </Button>
            <div style={{ marginTop: "1em" }} />
            <ListofTaskTemplates taskTemplates={data.taskTemplates} />
          </>
        )}
        <CreateTaskTemplateDrawer
          visible={openDrawer === "CREATE_TASK_TEMPLATE"}
          onClose={() => setOpenDrawer(null)}
        />
      </>
    );
  } else if (error) {
    return (
      <Error title="Couldn't fetch task templates" subtitle={error.message} />
    );
  }
  return null;
}

export default CustomizeTaskTemplates;
