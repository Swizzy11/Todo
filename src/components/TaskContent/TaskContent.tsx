import { FC, useEffect, useState } from 'react'
import { SubtaskData, TaskData } from '../../types/task'
import { DialogModal } from '../DialogModal'
import { SubtaskItem } from '../block/SubtaskItem'
import { useTypedSelector } from '../../utils/hooks/useTypedSelector'
import './TaskContent.scss'

type TaskContentProps = {
    task: TaskData
}

export const TaskContent:FC<TaskContentProps> = ({
    task
}) => {
    const {subtasks} = useTypedSelector(state => state.subtask)
    const [currentSubtasks, setSubtasks] = useState<Array<SubtaskData>>([])

    useEffect(() => {
        if(subtasks)  setSubtasks([...subtasks])
    }, [subtasks])

    return (
        <div className='taskContent'>
            <section>
                <h3 className='taskTitle'>Task: {task?.title}</h3>
                <br />
                {task?.content}
            </section>
            <div className='subtasks'>
                <br />
                <DialogModal 
                    dialogClass='' 
                    forTask={false}
                    inputClass={'subtask'} 
                    forSubtask={false} 
                />
                {
                    currentSubtasks.map((item, index) => {
                        return  <SubtaskItem
                                    key={index}
                                    data={item} 
                                    inputClass={`${index}`}                                   
                                />
                    })
                }
            </div>
    </div>
    )
}
