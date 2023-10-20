import { getTasks } from "./getTasks"
import { addTasks } from "./addTask"
import { TaskData } from "../../types/task"
import { deleteTask } from "./deleteTask"
import { updateTask } from "./updateTask"

export const taskController = (
    method: string,
    task?: TaskData | null,
    tasks?: TaskData[],
    projectID?: string,
    ) => {
            switch(method) {
                case('add'):
                    return addTasks(task!)
                case('get'):
                    return getTasks()
                case('delete'):
                    return deleteTask(task)
                case('update'):
                    return updateTask(tasks!, projectID!)
                default:
                    return [<>Что то пошло не так</>]
            }  
    }
