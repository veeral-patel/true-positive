import ITask from "./ITask";
import ITaskTemplate from "./ITaskTemplate";

interface ITaskGroup {
  id: number;
  name: string;
  tasks: ITask[];
  taskTemplates: ITaskTemplate[];
}

export default ITaskGroup;
