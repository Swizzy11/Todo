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
import './Project.scss'

export const Project = () => {
    const {currentTask, loading, error} = useTypedSelector(state => state.currentTask)
    const [task, setTask] = useState<TaskData>(currentTask)

    const navigate = useNavigate()
    const dispatch:Dispatch<any> = useDispatch()
    
    const deleteTask = () => {
        dispatch(fetchCurrentTask('delete', currentTask))
        dispatch(fetchTasks('delete', currentTask))
    }

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
                                        <Button 
                                            classname='btn-back' 
                                            type={'button'} 
                                            onClick={deleteTask}
                                        >
                                            Удалить задачу
                                        </Button>
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
                                                Статус: {task?.status}
                                                &nbsp;
                                                <DialogModal 
                                                    forTask={true}
                                                    dialogClass={'dialogForStatusBar'}
                                                    inputClass={'status'} 
                                                    forSubtask={false}                                            
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
