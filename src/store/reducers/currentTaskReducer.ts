import { CurrentTaskState, TaskAction, TaskActionTypes } from "../../types/task"

const inititalState:CurrentTaskState = {
    currentTask: '',
    loading: false,
    error: null
}

export const currentTaskReducer = (state = inititalState, action: TaskAction):CurrentTaskState => {
    switch (action.type) {
        case TaskActionTypes.FETCH_TASKS:
            return {loading: true, error: null, currentTask: ''}
        case TaskActionTypes.FETCH_CURRENT_TASKS_SUCCESS:
            return {loading: false, error: null, currentTask: action.payload}
        case TaskActionTypes.FETCH_TASKS_ERROR:
            return {loading: false, error: action.payload, currentTask: ''}
        default:
            return state
    }
}
