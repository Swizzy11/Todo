import { storage } from "../../services/LocalStorage/LocalStorage"
import { SubtaskData, TaskData } from "../../types/task"
import { getCurrentTime } from "./getCurrentTime"

export const createTask = (title:string, content: string) => {
    let projectID = storage.get('currentProject')
    const number = (storage.get(`Tasks_${projectID}`) !== null) 
                    ? 
                        storage.get(`Tasks_${projectID}`).length - 1 
                    : 
                        '1'

    projectID = JSON.parse(projectID!)

    const newTask:TaskData = {
        id: `${Date.now()}`,
        number: `${number}`,
        projectID: projectID!,
        status: 'empty',
        title: title,
        content: content,
        createTime: getCurrentTime(),
        priority: '0',
        closeTime: '',
        files: [],
        subtasks: []
    }
    return newTask
}

export const createNewSubtask = (
    title: string,
    content: string,
    currentTask: TaskData
) => {
    const subtaskNumber = (currentTask !== null && currentTask.subtasks !== null) 
                            ? 
                                storage.get('currentTask').subtasks.length 
                            : 
                                '0'

    const newSubtask:SubtaskData = {
        id: `${Date.now()}`,
        number: subtaskNumber,
        title: title,
        status: '',
        content: content,
        priority: '',
        createTime: getCurrentTime(),
        closeTime: '',
        taskID: currentTask.id,

    }

    return newSubtask
}
