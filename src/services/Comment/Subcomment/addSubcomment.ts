import { CommentData } from "../../../types/comment";
import { TaskData } from "../../../types/task";
import { storage } from "../../LocalStorage/LocalStorage";

export const addSubcomment = (comment:CommentData, subcomment:CommentData) => {
    const currentTask:TaskData = storage.get('currentTask')
    const subcomments:Array<CommentData> = storage.get(`Subcomments_${currentTask.id}`)

    if(subcomments) {
        subcomments.push(subcomment)
        storage.set(`Subcomments_${currentTask.id}`, subcomments)

        return subcomments
    }
    storage.set(`Subcomments_${currentTask.id}`, [subcomment])

    return [subcomment]
}
