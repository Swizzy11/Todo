import { TaskData } from "../../../types/task";
import { storage } from "../../LocalStorage/LocalStorage";
import { currentTaskController } from "./currentTaskController";


export const getCurrentTask = () => {
    let currentTask:TaskData = storage.get('currentTask')

    if(!currentTask) {
        currentTask = {
            id: '',
            status: '',
            projectID: '',
            title: '',
            content: '',
            createTime: '',
            closeTime: '',
            subtasks: [],
            comments: []
        }
       currentTaskController('add', currentTask)
    }
    return currentTask
}
