import { Dispatch, FC } from 'react'
import { TaskData } from '../../../types/task'
import { AddTaskForm } from '../../forms/AddTaskForm'
import { useDispatch } from 'react-redux'
import { fetchCurrentTask } from '../../../store/action-creator/currentTask'
import { fetchSubtask } from '../../../store/action-creator/subtask'
import { Button } from '../Button'
import { fetchTasks } from '../../../store/action-creator/task'
import { fetchComment } from '../../../store/action-creator/comment'
import { onDragOver, onDragStart, onDrop } from '../../../utils/hooks/dragNdrop'
import { fetchSubcomment } from '../../../store/action-creator/subcomments'
import './DropDownItem.scss'

type DropDownItemProps = {
    tasks: TaskData[],
    title: string,
    className: string,
}

export const DropDownItem:FC<DropDownItemProps> = ({
    tasks,
    title,
    className,

}) => {
    const dispatch:Dispatch<any> = useDispatch()

    
  return (
            <details className={`details details_${className}`}>
                <summary className='taskStatusTitle'>
                    {title}
                </summary>

                <ul 
                    className={`content content_${className}`} 
                    onDragOver={(e) => onDragOver(e, dispatch)}
                    onDrop={(e) =>onDrop(e)}
                >
                    { 
                        tasks.map((item, index) => {
                            if(className === item.status) {
                                const addCurrentTask = () => {
                                    dispatch(fetchCurrentTask('add', item))
                                    dispatch(fetchSubtask('get', item))
                                    dispatch(fetchComment('get', item))
                                    dispatch(fetchSubcomment('get'))
                                }
                                const deleteTask = () => {
                                    dispatch(fetchTasks('delete', item))
                                    dispatch(fetchCurrentTask('delete', item))
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
}
