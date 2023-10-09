const FETCH_COMMENTS = 'FETCH_COMMENTS'
const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS'
const FETCH_SUBCOMMENTS_SUCCESS = 'FETCH_SUBCOMMENTS_SUCCESS'
const FETCH_COMMENTS_ERROR = 'FETCH_TASKS_ERROR'
export interface CommentsState {
    comments: any[];
    loading: boolean;
    error: null | string;
}

export interface CommentData {
    id: string;
    taskID: string;
    content: string;
    createTime: string;
    comment: any[],
    commentID: string
}

export interface SubcommentsState {
    subcomments: any[];
    loading: boolean;
    error: null | string;
}

export enum CommentsActionTypes { 
    FETCH_COMMENTS = 'FETCH_COMMENTS',
    FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS',
    FETCH_SUBCOMMENTS_SUCCESS = 'FETCH_SUBCOMMENTS_SUCCESS',
    FETCH_COMMENTS_ERROR = 'FETCH_COMMENTS_ERROR',
}
interface FetchCommetsAction {
    type: CommentsActionTypes.FETCH_COMMENTS;
}
interface FetchCommentsSuccessAction {
    type: CommentsActionTypes.FETCH_COMMENTS_SUCCESS;
    payload: any[];
}

interface FetchSubcommentsSuccessAction {
    type: CommentsActionTypes.FETCH_SUBCOMMENTS_SUCCESS;
    payload: any[];
}
interface FetchCommentsErrorAction {
    type: CommentsActionTypes.FETCH_COMMENTS_ERROR;
    payload: string;
}
export type CommentsAction =  FetchCommetsAction
                            | FetchCommentsSuccessAction
                            | FetchSubcommentsSuccessAction
                            | FetchCommentsErrorAction
