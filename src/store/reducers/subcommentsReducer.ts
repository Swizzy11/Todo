import { CommentsAction, CommentsActionTypes, SubcommentsState } from "../../types/comment"

const inititalState:SubcommentsState = {
    subcomments: [],
    loading: false,
    error: null
}

export const subcommentsReducer = (state = inititalState, action: CommentsAction):SubcommentsState => {
    switch (action.type) {
        case CommentsActionTypes.FETCH_COMMENTS:
            return {loading: true, error: null, subcomments: []}
        case CommentsActionTypes.FETCH_SUBCOMMENTS_SUCCESS:
            return {loading: false, error: null, subcomments: action.payload}
        case CommentsActionTypes.FETCH_COMMENTS_ERROR:
            return {loading: false, error: action.payload, subcomments: [] }
        default:
            return state
    }
}
