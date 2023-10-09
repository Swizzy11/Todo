import { Dispatch } from "react"
import { CommentData, CommentsAction, CommentsActionTypes } from "../../types/comment"
import { subcommentsController } from "../../services/Comment/Subcomment/subcommentsController"


export const fetchSubcomment = (
    method: string,
    comment?: CommentData,
    subcomment?: CommentData
    ) => {
    return async (dispatch: Dispatch<CommentsAction>) => {
        try {
            
            const response = subcommentsController(method, comment!, subcomment!)

            dispatch({type: CommentsActionTypes.FETCH_SUBCOMMENTS_SUCCESS, payload: response!})
        } catch (e) {
            dispatch({type: CommentsActionTypes.FETCH_COMMENTS_ERROR, payload: 'Произошла ошибка при загрузке задачи'})
        }
    }
}
