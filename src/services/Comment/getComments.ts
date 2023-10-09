import { CommentData } from "../../types/comment";
import { TaskData } from "../../types/task";
import { storage } from "../LocalStorage/LocalStorage";

export const getComments = (currentTask:TaskData) => {
    const comments:Array<CommentData> = storage.get(`Comments_${currentTask.id}`)
    if(comments)return comments

    return []
}
