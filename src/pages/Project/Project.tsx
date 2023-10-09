import { Dispatch, useEffect, useState } from 'react'
import { useTypedSelector } from '../../utils/hooks/useTypedSelector'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { TasksBar } from '../../components/TasksBar'
import { Button } from '../../components/block/Button'
import { TaskData } from '../../types/task'
import { fetchCurrentTask } from '../../store/action-creator/currentTask'
import { fetchTasks } from '../../store/action-creator/task'
import { AddCommentForm } from '../../components/forms/AddCommentForm'
import { TaskContent } from '../../components/TaskContent'
import { Comments } from '../../components/Comments'
import { DialogModal } from '../../components/DialogModal'
import { getTimeAtWork } from '../../utils/hooks/getTimeAtWork'
import './Project.scss'

export const Project = () => {
    const {currentTask, loading, error} = useTypedSelector(state => state.currentTask)
    const [task, setTask] = useState<TaskData>(currentTask)

    const navigate = useNavigate()
    const dispatch:Dispatch<any> = useDispatch()

    useEffect(() => {
        setTask(currentTask)
    }, [currentTask])


    return(
            <div className="project">
                <header className='headerProject'>
                <label htmlFor="btn-burgers" className='btn-burger'>
                    <span className='btn-burger-element-1'></span>
                    <span className='btn-burger-element-2'></span>
                    <span className='btn-burger-element-3'></span>
                </label>
                    <Button 
                        type={'button'} 
                        classname='btn-back' 
                        onClick={() => {
                            navigate('/')
                            dispatch(fetchCurrentTask('delete'))
                        }}
                    >
                        К проектам
                    </Button>
                </header>
            <main className='mainProject'>
            <input type="checkbox" className='checkbox-burger' id='btn-burgers' />
                <TasksBar />
                <div className="currentTask">
                    {
                        (task) 
                            ?   <>
                                    <header className='headerCurrentProject'>
                                        { (task.closeTime !== '') 
                                        ? 
                                            <>
                                                В работе: {getTimeAtWork(task.createTime, task.closeTime)}
                                            </> 
                                        : 
                                                <></>
                                        }
                                    </header>
                                    <main className='mainCurrentProject'>
                                        <br />
                                        <TaskContent 
                                            task={task}
                                        />
                                        
                                        <span className='projectIndicators'>
                                            <time>
                                                Создано: {task?.createTime}
                                            </time>
                                            <span>
                                                Статус:
                                                &nbsp;
                                                <DialogModal 
                                                    dialogClass={'dialogForStatusBar'}
                                                    inputClass={'status'} 
                                                    forSubtask={false}
                                                    status={task.status}                                            
                                                />
                                            </span>
                                            <span>
                                                Приоритет:
                                                &nbsp;
                                                <DialogModal 
                                                        dialogClass={'dialogForPriority'}
                                                        inputClass={'priority'} 
                                                        forSubtask={false}
                                                        forPriority={true}
                                                        priority={task.priority}                                            
                                                    />
                                            </span>
                                            <time>
                                                Закрыто: {task?.closeTime}
                                            </time>
                                        </span>
                                        <br />
                                        <h5>Comments:</h5>
                                        <Comments />
                                    </main>
                                    <footer>
                                        <AddCommentForm currentTask={currentTask} />
                                    </footer>
                                </>
                            :<>Select a task</>
                    }
                </div>
            </main>
            </div>
         
    )
}
