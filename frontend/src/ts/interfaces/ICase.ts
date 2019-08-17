import IStatus from "./IStatus";

interface ICase {
  id: number;
  name: string;
  description: string;
  status: IStatus;
}

export default ICase;
