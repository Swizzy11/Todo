import { Dispatch } from "react"
import { TaskAction, TaskActionTypes, TaskData } from "../../types/task"
import { currentTaskController } from "../../services/Task/currentTask/currentTaskController"


export const fetchCurrentTask = (
    method: string,
    currentTask?: TaskData,
    ) => {
    return async (dispatch: Dispatch<TaskAction>) => {
        try {
            const response = currentTaskController(method, currentTask!)
            
            dispatch({type: TaskActionTypes.FETCH_CURRENT_TASKS_SUCCESS, payload: response!})
        } catch (e) {
            dispatch({type: TaskActionTypes.FETCH_TASKS_ERROR, payload: 'Произошла ошибка при загрузке задачи'})
        }
    }
}
