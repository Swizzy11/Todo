import { Dispatch, FC, ReactEventHandler, useCallback, useEffect, useMemo, useState } from 'react'
import { SubtaskData, TaskData } from '../../types/task'
import { SubtaskItem } from '../block/SubtaskItem'
import { useTypedSelector } from '../../utils/hooks/useTypedSelector'
import { Modal } from '../Modal'
import { useDispatch } from 'react-redux'
import { createNewSubtask } from '../../utils/createTask'
import { Button } from '../block/Button'
import { FilesItem } from '../block/Files'
import { filePiker } from '../../utils/filePicker'
import { useActions } from '../../utils/hooks/useActions'
import React from 'react'
import './TaskContent.scss'

type TaskContentProps = {
    task: TaskData
}

export const TaskContent:FC<TaskContentProps> =  React.memo(({
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

    const {fetchCurrentTask, fetchSubtask} = useActions()
    const dispatch:Dispatch<any> = useDispatch()

    const addTask:ReactEventHandler = useCallback(() => {
        if(inputValue !== '' && textareaValue !== '') {

            fetchSubtask(
                'add', 
                currentTask, 
                createNewSubtask(inputValue, textareaValue, currentTask)
            )

            setInputValue('')
            setTextareaValue('')
        }
    }, [])

    const onChangeTask = () => {
        if(!disabled) {
            task.title = title
            task.content = content

            fetchCurrentTask('update', task)
            setDisbled(true)
        } else {
            setDisbled(false)
        }
    }

    const onChangeInput = useCallback((e:React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }, [])

    const onChangeTextarea = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextareaValue(e.target.value)
    }, [])

    const onSetTitle = useCallback((e:React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }, [])

    const onSetContent = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value)
    }, [])

    const onSetDisabled = useCallback(() => {
        (disabled) ? setDisbled(false): setDisbled(true)
    }, [])

    const onSetFile = useCallback(() => {
        filePiker(task, dispatch)
    }, [])

    
    useMemo(() => {
        if(subtasks) setSubtasks([...subtasks])
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
                                onChange={onSetTitle}
                            />
                    } 
                    
                    <Button 
                        type={'button'} 
                        classname={'btn-edit'}
                        onClick={onSetDisabled} 
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
                                onChange={onSetContent}
                            />
                            <Button 
                                type={'button'} 
                                classname={'btn-files'} 
                                onClick={onSetFile}
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
                    onChangeInput={onChangeInput}
                    textareaValue={textareaValue}
                    onChangeTextarea={onChangeTextarea}
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
                                />
                    })
                }
            </div>
    </div>
    )
})
