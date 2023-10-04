import { Dispatch } from "react"
import { TaskAction, TaskActionTypes, TaskData } from "../../types/task"
import { commentsController } from "../../services/Comment/commentsController"
import { CommentData } from "../../types/comment"


export const fetchComment = (
    method: string,
    currentTask?: TaskData,
    comment?: CommentData
    ) => {
    return async (dispatch: Dispatch<TaskAction>) => {
        try {
            const response = commentsController(method, currentTask!, comment)

            dispatch({type: TaskActionTypes.FETCH_COMMENTS_SUCCESS, payload: response!})
        } catch (e) {
            dispatch({type: TaskActionTypes.FETCH_TASKS_ERROR, payload: 'Произошла ошибка при загрузке задачи'})
        }
    }
}
