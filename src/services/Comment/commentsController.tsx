import { CommentData } from "../../types/comment"
import { TaskData } from "../../types/task"
import { addComment } from "./addComment"
import { deleteComments } from "./deleteComment"
import { getComments } from "./getComments"


export const commentsController = (
    method: string,
    currentTask: TaskData,
    comment?: CommentData,
    ) => {
            switch(method) {
                case('add'):
                    return addComment(currentTask, comment!)
                case('get'): 
                    return getComments(currentTask)
                case('delete'): 
                    return deleteComments(currentTask, comment!)
                default:
                    return [<>Что то пошло не так</>]
            }  
    }
