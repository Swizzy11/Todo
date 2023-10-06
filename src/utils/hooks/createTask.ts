import { storage } from "../../services/LocalStorage/LocalStorage"
import { SubtaskData, TaskData } from "../../types/task"
import { getCurrentTime } from "./getCurrentTime"

export const createTask = (title:string, content: string) => {
    let projectID = storage.get('currentProject')

    projectID = JSON.parse(projectID!)

    const newTask:TaskData = {
        id: `${Date.now()}`,
        projectID: projectID!,
        status: 'unallocatedTasks',
        title: title,
        content: content,
        createTime: getCurrentTime(),
        closeTime: '',
        subtasks: [],
        comments: []
    }
    return newTask
}

export const createNewSubtask = (
    title: string,
    content: string,
    currentTask: TaskData
) => {
    const newSubtask:SubtaskData = {
        id: `${Date.now()}`,
        title: title,
        status: 'unallocatedTasks',
        content: content,
        createTime: getCurrentTime(),
        closeTime: '',
        taskID: currentTask.id,
    }

    return newSubtask
}
