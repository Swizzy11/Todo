import { CommentData } from "../../types/comment";
import { TaskData } from "../../types/task";
import { getTasksInStorage } from "../../utils/hooks/getTasksInStorage";
import { storage } from "../LocalStorage/LocalStorage";

export const addComment = (currentTask:TaskData, comment:CommentData) => {
    const tasks:Array<TaskData> = getTasksInStorage(currentTask)
    
    for(let i=0; i < tasks.length; i++) {
        
        if(tasks[i].id === currentTask.id) {
            tasks[i].comments.push(comment)
            
            storage.set(`Tasks_${currentTask.projectID}`, tasks)

            return tasks[i].comments
        }
    }
}
