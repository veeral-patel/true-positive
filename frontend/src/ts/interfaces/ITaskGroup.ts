import ITask from "./ITask";

interface ITaskGroup {
  id: number;
  name: string;
  tasks: ITask[];
}

export default ITaskGroup;
