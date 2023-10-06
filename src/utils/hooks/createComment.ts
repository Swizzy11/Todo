import { CommentData } from "../../types/comment"
import { TaskData } from "../../types/task"
import { getCurrentTime } from "./getCurrentTime"

export const createComment = (currentTask: TaskData, content: string) => {
    const id = Date.now()

    const newComment:CommentData = {
        id: `${id}`,
        taskID: `${currentTask.id}`,
        content: content,
        createTime: getCurrentTime()
    }

    return newComment
}
