import IPriority from "./IPriority";
import IStatus from "./IStatus";

interface ITask {
  name: string;
  status: IStatus;
  priority: IPriority;
}

export default ITask;
