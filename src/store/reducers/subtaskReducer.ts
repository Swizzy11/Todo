import { TaskAction, TaskActionTypes, SubtaskState } from "../../types/task"

const inititalState:SubtaskState = {
    subtask: '',
    loading: false,
    error: null
}

export const subtaskReducer = (state = inititalState, action: TaskAction):SubtaskState => {
    switch (action.type) {
        case TaskActionTypes.FETCH_TASKS:
            return {loading: true, error: null, subtask: ''}
        case TaskActionTypes.FETCH_SUBTASK_SUCCESS:
            return {loading: false, error: null, subtask: action.payload}
        case TaskActionTypes.FETCH_TASKS_ERROR:
            return {loading: false, error: action.payload, subtask: ''}
        default:
            return state
    }
}
