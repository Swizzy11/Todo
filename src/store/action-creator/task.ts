import { Dispatch } from "react"
import { TaskAction, TaskActionTypes, TaskData } from "../../types/task"
import { taskController } from "../../services/Task/taskController"


export const fetchTasks = (
    method: string,
    task?: TaskData,
    tasks?: TaskData[],
    projectID?: string,
    ) => {
    return async (dispatch: Dispatch<TaskAction>) => {
        try {
            const response = taskController(method, task!, tasks!, projectID!)

            dispatch({type: TaskActionTypes.FETCH_TASKS_SUCCESS, payload: response!})
        } catch (e) {
            dispatch({type: TaskActionTypes.FETCH_TASKS_ERROR, payload: 'Произошла ошибка при загрузке задач'})
        }
    }
}
