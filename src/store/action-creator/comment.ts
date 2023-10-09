import { Dispatch } from "react"
import { TaskData } from "../../types/task"
import { commentsController } from "../../services/Comment/commentsController"
import { CommentData, CommentsAction, CommentsActionTypes } from "../../types/comment"


export const fetchComment = (
    method: string,
    currentTask?: TaskData,
    comment?: CommentData
    ) => {
    return async (dispatch: Dispatch<CommentsAction>) => {
        try {
            dispatch({type: CommentsActionTypes.FETCH_COMMENTS})
            
            const response = commentsController(method, currentTask!, comment)

            dispatch({type: CommentsActionTypes.FETCH_COMMENTS_SUCCESS, payload: response!})
        } catch (e) {
            dispatch({type: CommentsActionTypes.FETCH_COMMENTS_ERROR, payload: 'Произошла ошибка при загрузке задачи'})
        }
    }
}
