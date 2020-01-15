import { useQuery } from "@apollo/react-hooks";
import { Select } from "antd";
import "container/shared/modals/FormInModal.css";
import GET_CASE_TEMPLATES from "queries/getCaseTemplates";
import React from "react";
import ICaseTemplate from "ts/interfaces/ICaseTemplate";

const { Option } = Select;

interface CaseTemplateData {
  caseTemplates: ICaseTemplate[];
}

interface Props {
  value?: any;
  onChange?: (value: any) => void;
}

function CaseTemplateSelect({ value, onChange }: Props) {
  const { loading, error, data: queryData } = useQuery<CaseTemplateData>(
    GET_CASE_TEMPLATES
  );

  var templateOptions = [];
  if (loading) {
    templateOptions = [
      <Option key="loading" value="loading" disabled>
        Loading...
      </Option>
    ];
  } else if (error || !queryData) {
    templateOptions = [
      <Option key="error" value="error" disabled>
        Failed to load templates
      </Option>
    ];
  } else {
    templateOptions = queryData.caseTemplates.map(caseTemplate => (
      <Option key={caseTemplate.id} value={caseTemplate.id}>
        {caseTemplate.name}
      </Option>
    ));
  }

  return (
    <Select
      showSearch
      placeholder="Choose a case template"
      defaultActiveFirstOption
      optionFilterProp="children"
      value={value}
      onChange={onChange}
    >
      {templateOptions}
    </Select>
  );
}

export default CaseTemplateSelect;
