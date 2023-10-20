import { FC, ReactEventHandler, useCallback, useState } from "react"
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
    
    const onChangeInput = useCallback((e:React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }, [])

    const onChangeTextarea = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextareaValue(e.target.value)
    }, [])

    return (
        <form>
            <Modal 
                inputValue={inputValue}
                onChangeInput={onChangeInput}     
                textareaValue={textareaValue}
                onChangeTextarea={onChangeTextarea}
                onClick={onClick}
                forSubtask={false}
                subtaskModalClass=""
                forComments={false} 
            />
        </form>
    )
}
