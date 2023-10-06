import { TaskData } from "../../types/task";
import { storage } from "../LocalStorage/LocalStorage";

export const updateTask = (tasks: TaskData[], projectID: string) => {
    storage.set(`Tasks_${projectID}`, tasks)
    
    return tasks
}
