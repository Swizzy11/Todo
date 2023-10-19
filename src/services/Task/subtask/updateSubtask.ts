import { Dispatch } from "react";
import { SubtaskData, TaskData } from "../../../types/task";
import { storage } from "../../LocalStorage/LocalStorage";
import { fetchTasks } from "../../../store/action-creator/task";
import { fetchCurrentTask } from "../../../store/action-creator/currentTask";
import { getTasksInStorage } from "../../../utils/getTasksInStorage";
import { getCurrentTime } from "../../../utils/getCurrentTime";


export const updateSubtask = (
    currentTask:TaskData, 
    subtask:SubtaskData, 
    status: string, 
    dispatch?: Dispatch<any>
    ) => {
        if(status === 'queue' || status === 'done' || status === 'development') {

            const tasks = getTasksInStorage(currentTask)
            const subtasks:Array<SubtaskData> = storage.get('currentTask').subtasks

            for(let i=0; i < subtasks.length; i++) {
                if(subtasks[i].id === subtask.id) {
                    subtasks[i].status = status
                }
                if(subtasks[i].status === 'done') {
                    subtasks[i].closeTime = getCurrentTime()
                }
            }

            for(let i=0; i < tasks.length; i++) {
                if(tasks[i].id === currentTask.id) {

                    tasks[i] = currentTask
                    tasks[i].subtasks = subtasks
                    currentTask.subtasks = subtasks

                    storage.set(`currentTask`, currentTask)
                    storage.set(`Tasks_${currentTask.projectID}`, tasks)

                    dispatch!(fetchTasks('update', tasks[i], tasks, currentTask.projectID))
                    dispatch!(fetchCurrentTask('update', currentTask, dispatch))
                    
                    return subtasks
                }
            }   
        }
        return []
}
