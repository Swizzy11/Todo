import { CommentData } from "../../../types/comment"
import { TaskData } from "../../../types/task"
import { storage } from "../../LocalStorage/LocalStorage"


export const deleteSubcomments = (comment:CommentData, subcomment: CommentData) => {
    const currentTask:TaskData = storage.get('currentTask')
    const subcomments:Array<CommentData> = storage.get(`Subcomments_${currentTask.id}`)

    for(let i = 0; i < subcomments.length; i++) {

        if(subcomments[i].id === subcomment.id) {
            subcomments.splice(i,1)
            storage.set(`Subcomments_${currentTask.id}`, subcomments)

            return subcomments
        }
    }
    
}
