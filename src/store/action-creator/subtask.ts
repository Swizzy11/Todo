import { Dispatch } from "react"
import { SubtaskData, TaskAction, TaskActionTypes, TaskData } from "../../types/task"
import { subtaskController } from "../../services/Task/subtask/subtaskController"


export const fetchSubtask = (
    method: string,
    currentTask?: TaskData,
    subtask?: SubtaskData,
    status?: string,
    Dispatch?: Dispatch<any>
    ) => {
    return async (dispatch: Dispatch<TaskAction>) => {
        try {
            const response = subtaskController(method, currentTask!, subtask, status, Dispatch)

            dispatch({type: TaskActionTypes.FETCH_SUBTASK_SUCCESS, payload: response!})
        } catch (e) {
            dispatch({type: TaskActionTypes.FETCH_TASKS_ERROR, payload: 'Произошла ошибка при загрузке задачи'})
        }
    }
}
