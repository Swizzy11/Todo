import { TaskAction, TaskActionTypes, TaskData, TaskState } from "../../types/task"

const inititalState:TaskState = {
    tasks: [],
    loading: false,
    error: null
}

export const taskReducer = (state = inititalState, action: TaskAction):TaskState => {
    switch (action.type) {
        case TaskActionTypes.FETCH_TASKS:
            return {loading: true, error: null, tasks: []}
        case TaskActionTypes.FETCH_TASKS_SUCCESS:
            return {loading: false, error: null, tasks: action.payload}
        case TaskActionTypes.FETCH_TASKS_ERROR:
            return {loading: false, error: action.payload, tasks: []}
        default:
            return state
    }
}
