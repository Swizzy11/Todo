import { CommentData } from "./comment"

const FETCH_TASKS = 'FETCH_TASKS'
const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS'
const FETCH_TASKS_ERROR = 'FETCH_TASKS_ERROR'
const FETCH_CURRENT_TASKS_SUCCESS = 'FETCH_CURRENT_TASKS_SUCCESS'
const FETCH_SUBTASK_SUCCESS = 'FETCH_SUBTASK_SUCCESS'

export interface TaskState {
    tasks: any[];
    loading: boolean;
    error: null | string;
}

export interface CurrentTaskState {
    currentTask: any;
    loading: boolean;
    error: null | string;
}

export interface SubtaskState {
    subtasks: any[];
    loading: boolean;
    error: null | string;
}


export enum TaskActionTypes {
    FETCH_TASKS = 'FETCH_TASKS',
    FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS',
    FETCH_TASKS_ERROR = 'FETCH_TASKS_ERROR',
    FETCH_CURRENT_TASKS_SUCCESS = 'FETCH_CURRENT_TASKS_SUCCESS',
    FETCH_SUBTASK_SUCCESS = 'FETCH_SUBTASK_SUCCESS',
}

interface FetchTasksAction {
    type: TaskActionTypes.FETCH_TASKS;
}

interface FetchTasksSuccessAction {
    type: TaskActionTypes.FETCH_TASKS_SUCCESS;
    payload: any[];
}

interface FetchCurrentTaskSuccessAction {
    type: TaskActionTypes.FETCH_CURRENT_TASKS_SUCCESS;
    payload: any;
}

interface FetchSubtaskSuccessAction {
    type: TaskActionTypes.FETCH_SUBTASK_SUCCESS;
    payload: any;
}

interface FetchTasksErrorAction {
    type: TaskActionTypes.FETCH_TASKS_ERROR;
    payload: string;
}

export interface TaskData {
    id: string;
    number: string;
    priority: string;
    status: string;
    projectID: string;
    title: string;
    content: string;
    createTime: string;
    closeTime: string;
    files: any[];
    subtasks: SubtaskData[];
}

export interface SubtaskData extends Omit<TaskData, 'projectID' | 'subtasks' | 'comments' | 'files' > {
    taskID: string
}  

export type TaskAction = FetchTasksAction 
                        | FetchTasksSuccessAction 
                        | FetchTasksErrorAction 
                        | FetchCurrentTaskSuccessAction 
                        | FetchSubtaskSuccessAction 
