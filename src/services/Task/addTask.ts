import { TaskData } from "../../types/task";
import { storage } from "../LocalStorage/LocalStorage";

export const addTasks = (task: TaskData) => {
    const key = storage.get('currentProject')?.match(/[0-9]+/g)![0]
    let tasks = storage.get(`Tasks_${key}`)!
   
    tasks!.push(task)  
    storage.set(`Tasks_${key}`, tasks)     

    return tasks
}
