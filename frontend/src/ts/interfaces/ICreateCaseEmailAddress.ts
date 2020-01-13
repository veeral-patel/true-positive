import ICaseTemplate from "./ICaseTemplate";

interface ICreateCaseEmailAddress {
  id: number;
  email: string;
  template: ICaseTemplate;
}

export default ICreateCaseEmailAddress;
