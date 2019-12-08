import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import AllTasksStore from "stores/AllTasksStore";

interface IFilterInputProps {
  allTasksStore?: AllTasksStore;
}

export default inject("allTasksStore")(
  observer(
    class FilterInput extends React.Component<IFilterInputProps> {
      render() {
        const { allTasksStore } = this.props;
        return (
          <Input
            allowClear
            value={allTasksStore!.filterValue}
            placeholder="Filter tasks"
            prefix={<SearchOutlined />}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              allTasksStore!.setFilterValue(e.currentTarget.value)
            }
          />
        );
      }
    }
  )
);
