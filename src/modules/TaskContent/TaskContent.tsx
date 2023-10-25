import React from 'react'
import { Dispatch, FC, useCallback, useMemo, useState } from 'react'
import { SubtaskData, TaskData } from '../../types/task'
import { SubtaskItem } from '../../components/SubtaskItem'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { useDispatch } from 'react-redux'
import { Button } from '../../UI/Button'
import { FilesItem } from '../../UI/Files'
import { filePiker } from '../../utils/filePicker'
import { useActions } from '../../hooks/useActions'
import { AddTaskForm } from '../forms/AddTaskForm'
import { Row } from 'antd'
import './TaskContent.scss'

type TaskContentProps = {
    task: TaskData
}

export const TaskContent:FC<TaskContentProps> =  React.memo(({
    task
}) => {
    const {subtasks} = useTypedSelector(state => state.subtask)

    const [currentSubtasks, setSubtasks] = useState<Array<SubtaskData>>([])
    const [disabled, setDisbled] = useState(true)
    const [title, setTitle] = useState(task.title)
    const [content, setContent] = useState(task.content)

    const {fetchCurrentTask, fetchSubtask} = useActions()
    const dispatch:Dispatch<any> = useDispatch()


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
            <Row justify={'center'} align={'middle'}>
                <AddTaskForm  forSubtask={true} />      
            </Row>
            <div className='subtasks'>
                <br />
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
