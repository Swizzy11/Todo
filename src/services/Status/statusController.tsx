import { Dispatch } from "react"
import { TaskData } from "../../types/task"
import { updateStatus } from "./updateStatus"

export const statusController = (
    method: string,
    currentTask: TaskData,
    status: string,
    dispatch: Dispatch<any>
    ) => {
            switch(method) {
                case('update'):
                    return updateStatus(currentTask, status, dispatch)
                default:
                    return [<>Что то пошло не так</>]
            }  
    }
