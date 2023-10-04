
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
}

