import { Dispatch } from "react"
import { fetchCurrentTask } from "../store/action-creator/currentTask"
import { TaskData } from "../types/task"


export const filePiker = async (task:TaskData, dispatch:Dispatch<any>) => {
    //@ts-ignore
    const fileHandler = await window.showOpenFilePicker()
    const fileContentName = fileHandler[0].name

    task.files = [...task.files, fileContentName]
    dispatch(fetchCurrentTask('update', task, dispatch))
}
