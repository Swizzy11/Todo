import { TaskAction, TaskActionTypes, SubtaskState } from "../../types/task"

const inititalState:SubtaskState = {
    subtasks: [],
    loading: false,
    error: null
}

export const subtaskReducer = (state = inititalState, action: TaskAction):SubtaskState => {
    switch (action.type) {
        case TaskActionTypes.FETCH_TASKS:
            return {loading: true, error: null, subtasks: []}
        case TaskActionTypes.FETCH_SUBTASK_SUCCESS:
            return {loading: false, error: null, subtasks: action.payload}
        case TaskActionTypes.FETCH_TASKS_ERROR:
            return {loading: false, error: action.payload, subtasks: []}
        default:
            return state
    }
}
