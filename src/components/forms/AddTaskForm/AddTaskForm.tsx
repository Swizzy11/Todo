import { FC, ReactEventHandler, useState } from "react"
import { createTask } from "../../../utils/createTask"
import { Modal } from "../../Modal"
import { useActions } from "../../../utils/hooks/useActions"
import './AddTaskForm.scss'

export const AddTaskForm:FC = () => {
    const [inputValue, setInputValue] = useState('')
    const [textareaValue, setTextareaValue] = useState('')
    const {fetchTasks, fetchCurrentTask, fetchSubtask} = useActions()

    const onClick:ReactEventHandler = () => {
        if(inputValue !== '') {
            fetchTasks('add', createTask(inputValue, textareaValue))
            fetchCurrentTask('add',createTask(inputValue, textareaValue))
            fetchSubtask('update')

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

                onClick={onClick}
                forSubtask={false}
                subtaskModalClass=""
                forComments={false} 
            />
        </form>
    )
}
