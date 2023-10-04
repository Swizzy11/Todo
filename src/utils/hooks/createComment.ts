import { CommentData } from "../../types/comment"
import { TaskData } from "../../types/task"

export const createComment = (currentTask: TaskData, content: string) => {
    const id = Date.now()
    const date = new Date()
    const newComment:CommentData = {
        id: `${id}`,
        taskID: `${currentTask.id}`,
        content: content,
        createTime: `${(date.getHours() < 10) ? '0' + date.getHours() : date.getHours()}:${date.getMinutes()}`
    }

    return newComment
}
