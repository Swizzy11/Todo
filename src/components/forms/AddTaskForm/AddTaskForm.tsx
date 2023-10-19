import { Dispatch, FC, ReactEventHandler, useState } from "react"
import { createTask } from "../../../utils/createTask"
import { useDispatch } from "react-redux"
import { fetchTasks } from "../../../store/action-creator/task"
import { Modal } from "../../Modal"
import { fetchCurrentTask } from "../../../store/action-creator/currentTask"
import { fetchSubtask } from "../../../store/action-creator/subtask"
import './AddTaskForm.scss'

export const AddTaskForm:FC = () => {
    const [inputValue, setInputValue] = useState('')
    const [textareaValue, setTextareaValue] = useState('')

    const dispatch:Dispatch<any> = useDispatch()

    const addTask:ReactEventHandler = () => {
        if(inputValue !== '') {
            dispatch(fetchTasks('add', createTask(inputValue, textareaValue)))
            dispatch(fetchCurrentTask('add',createTask(inputValue, textareaValue)))
            dispatch(fetchSubtask('update'))

            setInputValue('');
            setTextareaValue('')
        }else {
            console.log('Введите название')
        }
    }
    
    return (
        <form>
            <Modal 
                inputValue={inputValue}
                onChangeInput={
                                (e) => setInputValue(e.currentTarget.value)
                            }
                            
                textareaValue={textareaValue}
                onChangeTextarea={
                                    (e) => setTextareaValue(e.currentTarget.value)
                                }

                onClick={addTask}
                forSubtask={false}
                subtaskModalClass=""
                forComments={false} 
            />
        </form>
    )
}
