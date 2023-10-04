import { storage } from "../../services/LocalStorage/LocalStorage"
import { SubtaskData, TaskData } from "../../types/task"

export const createTask = (title:string, content: string) => {
    let projectID = storage.get('currentProject')
    const date = new Date()

    projectID = JSON.parse(projectID!)

    const newTask:TaskData = {
        id: `${Date.now()}`,
        projectID: projectID!,
        status: 'unallocatedTasks',
        title: title,
        content: content,
        createTime: `${(date.getHours() < 10) ? '0' + date.getHours() : date.getHours()}:${date.getMinutes()}`,
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
    const date = new Date()

    const newSubtask:SubtaskData = {
        id: `${Date.now()}`,
        title: title,
        status: '',
        content: content,
        createTime: `${(date.getHours() < 10) ? '0' + date.getHours() : date.getHours()}:${date.getMinutes()}`,
        closeTime: '',
        taskID: currentTask.id,
    }

    return newSubtask
}
