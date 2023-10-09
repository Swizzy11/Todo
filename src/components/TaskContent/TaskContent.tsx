import { Dispatch, FC, ReactEventHandler, useEffect, useState } from 'react'
import { SubtaskData, TaskData } from '../../types/task'
import { SubtaskItem } from '../block/SubtaskItem'
import { useTypedSelector } from '../../utils/hooks/useTypedSelector'
import { Modal } from '../Modal'
import { useDispatch } from 'react-redux'
import { fetchSubtask } from '../../store/action-creator/subtask'
import { createNewSubtask } from '../../utils/hooks/createTask'
import { Button } from '../block/Button'
import { fetchCurrentTask } from '../../store/action-creator/currentTask'
import { FilesItem } from '../block/Files'
import { filePiker } from '../../utils/hooks/filePicker'
import './TaskContent.scss'

type TaskContentProps = {
    task: TaskData
}

export const TaskContent:FC<TaskContentProps> = ({
    task
}) => {
    const {subtasks} = useTypedSelector(state => state.subtask)
    const {currentTask} = useTypedSelector(state => state.currentTask)

    const [currentSubtasks, setSubtasks] = useState<Array<SubtaskData>>([])
    const [disabled, setDisbled] = useState(true)
    const [title, setTitle] = useState(task.title)
    const [content, setContent] = useState(task.content)

    const [inputValue, setInputValue] = useState('')
    const [textareaValue, setTextareaValue] = useState('')

    const dispatch:Dispatch<any> = useDispatch()


    const addTask:ReactEventHandler = () => {
        if(inputValue !== '' && textareaValue !== '') {

            dispatch(fetchSubtask(
                'add', 
                currentTask, 
                createNewSubtask(inputValue, textareaValue, currentTask)
            ))

            setInputValue('')
            setTextareaValue('')
        }
    }

    const onChangeTask = () => {

        if(!disabled) {
            task.title = title
            task.content = content

            dispatch(fetchCurrentTask('update', task, dispatch))
            setDisbled(true)
        } else {
            setDisbled(false)
        }
    }

    useEffect(() => {
        if(subtasks)  setSubtasks([...subtasks])
    }, [subtasks])

    return (
        <div className='taskContent'>
            <section>
                <h3 className='taskTitle'>
                    Task {task.number}:&nbsp;
                    {
                        (disabled) 
                        ? 
                            `${task.title}`
                        :
                            <input 
                                type="text" 
                                className='changeInputTitle' 
                                placeholder={task?.title}
                                value={title}
                                onChange={(e) => setTitle(e.currentTarget.value)}
                            />
                    } 
                    
                    <Button 
                        type={'button'} 
                        classname={'btn-edit'}
                        onClick={()=> (disabled) ? setDisbled(false): setDisbled(true)} 
                    />
                </h3>
                <br />
                {
                    (disabled) 
                    ?
                        <>
                            {task.content}
                            <div className='taskFiles'>
                                {
                                    task.files.map((item) => {
                                        return (
                                            <FilesItem fileName={item} />
                                        )
                                    })
                                }
                            </div>
                            
                        </> 
                    : 
                    <>
                        <span className='changeContent'>
                            <textarea 
                                placeholder={task?.content}
                                value={content}
                                rows={2}
                                onChange={(e) => setContent(e.currentTarget.value)}
                            />
                            <Button 
                                type={'button'} 
                                classname={'btn-files'} 
                                onClick={() => filePiker(task, dispatch)}
                                />
                        </span>
                        <Button 
                            type={'button'} 
                            onClick={onChangeTask}
                            classname={'btn-back'}
                        >
                            Изменить
                        </Button>
                    </>
                }
            </section>
            <div className='subtasks'>
                <br />
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
                    forSubtask={true}
                    subtaskModalClass='Subtask'
                    forComments={false} 
                />
                {
                    currentSubtasks.map((item, index) => {
                        return  <SubtaskItem
                                    key={index}
                                    data={item} 
                                    inputClass={`${index}`}                                   
                                />
                    })
                }
            </div>
    </div>
    )
}
