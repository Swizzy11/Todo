import { Dispatch, useEffect, useMemo, useState } from 'react'
import { DropDownItem } from '../block/DropDownItem'
import { useTypedSelector } from '../../utils/hooks/useTypedSelector'
import { useDispatch } from 'react-redux'
import { fetchTasks } from '../../store/action-creator/task'
import { TaskData } from '../../types/task'
import { createTask } from '../../utils/hooks/createTask'
import { Search } from '../Search'
import './TasksBar.scss'

export const TasksBar = () => {
    const {tasks, loading, error} = useTypedSelector(state => state.tasks)
    const [taskList, setTask] = useState<Array<TaskData>>([createTask('', '')])
    const dispatch: Dispatch<any> = useDispatch()

    useEffect(() => {
        dispatch(fetchTasks('get'))
    }, [])
    
    useMemo(() => {
        setTask(tasks)
    }, [tasks])
    
      
  return (
      <div className="tasksBar">
            <Search></Search>
              <DropDownItem
                    tasks={taskList}
                    className={'empty'}
                    title={'Tasks'}
                  />
              <DropDownItem
                    tasks={taskList}
                    className={'queue'}
                    title={'Queue'}
                    />
              <DropDownItem
                    tasks={taskList}
                    className={'development'}
                    title={'Development'}
                />
              <DropDownItem
                    tasks={taskList}
                    className={'doneTasks'}
                    title={'Done'}
                />
          </div>
  )
}

