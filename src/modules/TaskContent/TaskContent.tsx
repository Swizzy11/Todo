import React from 'react'
import { Dispatch, FC, useMemo, useState } from 'react'
import { SubtaskData, TaskData } from '../../types/task'
import { SubtaskItem } from '../../components/SubtaskItem'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { useDispatch } from 'react-redux'
import { ButtonHost } from '../../UI/ButtonHost'
import { FilesItem } from '../../UI/Files'
import { filePiker } from '../../utils/filePicker'
import { useActions } from '../../hooks/useActions'
import { AddTaskForm } from '../forms/AddTaskForm'
import { Row } from 'antd'
import { EditOutlined, FileAddOutlined } from '@ant-design/icons'
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

    const {fetchCurrentTask} = useActions()
    const dispatch:Dispatch<any> = useDispatch()


    const onChangeTask = () => {
        if(!disabled) {
            task.title = title
            task.content = content

            fetchCurrentTask('update', task, dispatch)
            setDisbled(true)
        } else {
            setDisbled(false)
        }
    }

    const onSetTitle = (e:React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const editContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value)
    }

    const onSetDisabled = () => {
        (disabled) ? setDisbled(false): setDisbled(true)
    }

    const onSetFile = () => {
        filePiker(task, dispatch)
    }

    
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
                    <EditOutlined 
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
                                    task.files.map((item, index) => {
                                        return (
                                            <FilesItem fileName={item} key={index} />
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
                                onChange={editContent}
                            />
                            
                        </span>
                        <Row justify={'space-between'}>
                            <ButtonHost 
                                type={'button'} 
                                onClick={onChangeTask}
                                classname={'btn-back'}
                            >
                                Изменить
                            </ButtonHost>
                            <FileAddOutlined
                                    className='btn-files'
                                    style={{fontSize: '2.5vh'}} 
                                    onClick={onSetFile}
                                />
                        </Row>
                        
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
