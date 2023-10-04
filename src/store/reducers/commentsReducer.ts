import { CommentsState } from "../../types/comment"
import { TaskAction, TaskActionTypes } from "../../types/task"

const inititalState:CommentsState = {
    comments: [],
    loading: false,
    error: null
}

export const commentsReducer = (state = inititalState, action: TaskAction):CommentsState => {
    switch (action.type) {
        case TaskActionTypes.FETCH_TASKS:
            return {loading: true, error: null, comments: []}
        case TaskActionTypes.FETCH_COMMENTS_SUCCESS:
            return {loading: false, error: null, comments: action.payload}
        case TaskActionTypes.FETCH_TASKS_ERROR:
            return {loading: false, error: action.payload, comments: [] }
        default:
            return state
    }
}
