import { CommentData } from "../../types/comment"
import { TaskData } from "../../types/task"
import { storage } from "../LocalStorage/LocalStorage"

export const deleteComments = (currentTask:TaskData, comment: CommentData) => {
    const comments:Array<CommentData> = storage.get(`Comments_${currentTask.id}`)

    for(let i = 0; i < comments.length; i++) {

        if(comments[i].id === comment.id) {
            comments.splice(i,1)
            storage.set(`Comments_${currentTask.id}`, comments)

            return comments
        }
    }
    
}
