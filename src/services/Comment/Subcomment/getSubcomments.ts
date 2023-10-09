import { CommentData } from "../../../types/comment";
import { TaskData } from "../../../types/task";
import { storage } from "../../LocalStorage/LocalStorage";

export const getSubcomments = (comment:CommentData) => {
    const currentTask:TaskData = storage.get('currentTask')
    const subcomments:Array<CommentData> = storage.get(`Subcomments_${currentTask.id}`)
    
    if(subcomments) return subcomments
    
    return []
}
