import { storage } from "../LocalStorage/LocalStorage"


export const deleteTask = (currentTask:any) => {
    const tasks = storage.get(`Tasks_${currentTask.projectID}`)!

    for(let i = 0; i < tasks.length; i++) {
        if(tasks[i].id === currentTask.id) {
           tasks.splice(i,1)
           storage.set(`Tasks_${currentTask.projectID}`, tasks)
        }
    }
    return tasks
}
