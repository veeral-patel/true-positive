import IStatus from "./IStatus";
import IPriority from "./IPriority";

interface ICase {
  id: number;
  name: string;
  description: string;
  status: IStatus;
  priority: IPriority;
}

export default ICase;
