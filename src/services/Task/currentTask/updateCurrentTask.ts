import { TaskData } from "../../../types/task";
import { storage } from "../../LocalStorage/LocalStorage";


export const updateCurrentTask = (currentTask: TaskData) => {
    storage.set(`currentTask`, currentTask)
    
    return currentTask
}
