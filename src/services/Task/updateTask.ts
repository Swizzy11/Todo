import { TaskData } from "../../types/task";
import { storage } from "../LocalStorage/LocalStorage";

export const updateTask = (tasks: TaskData[], projectID: string) => {
    console.log(projectID)
    storage.set(`Tasks_${projectID}`, tasks)
    return tasks
}
