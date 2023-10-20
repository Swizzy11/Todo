import { Dispatch, FC } from 'react'
import { TaskData } from '../../../types/task'
import { AddTaskForm } from '../../forms/AddTaskForm'
import { useDispatch } from 'react-redux'
import { Button } from '../Button'
import { onDragOver, onDragStart, onDrop } from '../../../utils/dragNdrop'
import { useActions } from '../../../utils/hooks/useActions'
import './DropDownItem.scss'
import React from 'react'

type DropDownItemProps = {
    tasks: TaskData[],
    title: string,
    className: string,
}

export const DropDownItem:FC<DropDownItemProps> = React.memo(({
    tasks,
    title,
    className,

}) => {
    const dispatch:Dispatch<any> = useDispatch()
    const { fetchCurrentTask, 
            fetchSubtask, 
            fetchComment,
            fetchSubcomment, 
            fetchTasks
                        } = useActions()
    
  return (
            <details className={`details details_${className}`}>
                <summary className='taskStatusTitle'>
                    {title}
                </summary>

                <ul 
                    className={`content content_${className}`} 
                    onDragOver={(e) => onDragOver(e, dispatch)}
                    onDrop={(e) => onDrop(e)}
                >
                    { 
                        tasks.map((item, index) => {
                            if(className === item.status) {
                                const addCurrentTask = () => {
                                    fetchCurrentTask('add', item)
                                    fetchSubtask('get', item)
                                    fetchComment('get', item)
                                    fetchSubcomment('get')
                                }
                                const deleteTask = () => {
                                    fetchTasks('delete', item)
                                    fetchCurrentTask('delete', item)
                                }
                                
                                return <li  
                                            id={`${index}`}
                                            className='task'
                                            key={index}
                                            draggable={true}
                                            onDragStart={onDragStart}
                                        >
                                            <label 
                                                htmlFor='btn-burgers'
                                                className='taskTitleDropdown' 
                                                onClick={addCurrentTask}
                                            >
                                                {item.title}
                                            </label>
                                            <Button 
                                                type={'button'} 
                                                classname='btn-delete' 
                                                onClick={deleteTask}
                                            >
                                                X
                                            </Button>
                                        </li>
                            }
                        })
                    }
                    {
                        (title === 'Tasks') 
                        ?   <li className='task'>
                                <AddTaskForm />
                            </li>
                        : <></>
                    }
                </ul>
            </details>
  )
})
