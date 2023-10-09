import { CommentData } from "../../types/comment";
import { TaskData } from "../../types/task";
import { storage } from "../LocalStorage/LocalStorage";

export const addComment = (currentTask:TaskData, comment:CommentData) => {
    const comments:Array<CommentData> = storage.get(`Comments_${currentTask.id}`)
    if(comments) {
        comments.push(comment)
        storage.set(`Comments_${currentTask.id}`, comments)

        return comments
    } 
    storage.set(`Comments_${currentTask.id}`, [comment])
    
    return [comment]
}
