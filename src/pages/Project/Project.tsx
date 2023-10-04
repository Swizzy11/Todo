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
import './Project.scss'
import { Comments } from '../../components/Comments'
import { DialogModal } from '../../components/DialogModal'

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
            <TasksBar />
            <div className="currentTask">
                {
                    (task) 
                        ?   <>
                                <header>
                                    <Button 
                                        type={'button'} 
                                        classname='btn-back' 
                                        onClick={() => navigate('/')}
                                    >
                                        К проектам
                                    </Button>
                                    <Button 
                                        classname='btn-back' 
                                        type={'button'} 
                                        onClick={deleteTask}
                                    >
                                        Удалить задачу
                                    </Button>
                                </header>
                                <main>
                                    <br />
                                    <TaskContent 
                                        task={task} 
                                        currentTask={currentTask} 
                                    />
                                    <span>
                                        <time>
                                            Создано: {task?.createTime}
                                        </time>
                                        <span>
                                            Статус: {task?.status}
                                            &nbsp;
                                            <DialogModal 
                                                forTask={true}
                                                currentTask={currentTask} 
                                                dialogClass={'dialogForStatusBar'}
                                                 
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
        </div>
    )
}
