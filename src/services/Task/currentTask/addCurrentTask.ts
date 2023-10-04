import { TaskData } from "../../../types/task";
import { storage } from "../../LocalStorage/LocalStorage";


export const addCurrentTask = (currentTask: TaskData) => {
    storage.set('currentTask', JSON.stringify(currentTask))
    return currentTask
}
