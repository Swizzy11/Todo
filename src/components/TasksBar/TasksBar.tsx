import { Dispatch, useEffect, useMemo, useState } from 'react'
import { DropDownItem } from '../DropDownItem'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { useDispatch } from 'react-redux'
import { fetchTasks } from '../../store/action-creator/task'
import { TaskData } from '../../types/task'
import { createTask } from '../../utils/createTask'
import { Search } from '../../modules/Search'
import './TasksBar.scss'

export const TasksBar = () => {
    const {tasks} = useTypedSelector(state => state.tasks)
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
                    className={'done'}
                    title={'Done'}
                />
          </div>
  )
}

