import { Dispatch, useEffect, useMemo, useState } from 'react'
import { DropDownItem } from '../block/DropDownItem'
import { useTypedSelector } from '../../utils/hooks/useTypedSelector'
import { useDispatch } from 'react-redux'
import { fetchTasks } from '../../store/action-creator/task'
import './TasksBar.scss'
import { TaskData } from '../../types/task'

export const TasksBar = () => {
    const {tasks, loading, error} = useTypedSelector(state => state.tasks)

    const [taskList, setTask] = useState<Array<TaskData>>([{
                                            id: "",
                                            status: "",
                                            projectID: "",
                                            title: "",
                                            content: "",
                                            createTime: "",
                                            closeTime: "",
                                            subtasks: [],
                                            comments: []
                                        }])
    const dispatch: Dispatch<any> = useDispatch()

    useEffect(() => {
        dispatch(fetchTasks('get'))
        
    }, [])
    
    useMemo(() => {
        setTask(tasks)
    }, [tasks])

  return (
    <div className="tasksBar">
        <DropDownItem
            tasks={taskList} 
            className={'unallocatedTasks'} 
            title={'Tasks'} 
        />
        <DropDownItem
            tasks={taskList} 
            className={'inProgress'} 
            title={'In progress'} 
        />
        <DropDownItem
            tasks={taskList} 
            className={'onReview'} 
            title={'On review'}
        />
        <DropDownItem
            tasks={taskList} 
            className={'doneTasks'} 
            title={'Done'} 
        />
    </div>
  )
}

