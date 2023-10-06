import { TaskData } from "../../types/task";
import { getTasksInStorage } from "../../utils/hooks/getTasksInStorage";

export const getComments = (currentTask:TaskData) => {
    const tasks:Array<TaskData> = getTasksInStorage(currentTask)

    for(let i=0; i < tasks.length; i++) {        
        if(tasks[i].id === currentTask.id) {
            return tasks[i].comments
        }
    }
}
