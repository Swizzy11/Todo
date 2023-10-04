import { FC, useEffect, useState } from 'react'
import { SubtaskData, TaskData } from '../../types/task'
import { DialogModal } from '../DialogModal'
import { SubtaskItem } from '../block/SubtaskItem'
import { useTypedSelector } from '../../utils/hooks/useTypedSelector'
import './TaskContent.scss'

type TaskContentProps = {
    task: TaskData,
    currentTask: TaskData
}

export const TaskContent:FC<TaskContentProps> = ({
    task,
    currentTask
}) => {
    const [subtasks, setSubtasks] = useState<Array<SubtaskData>>([])
    const {subtask} = useTypedSelector(state => state.subtask)

    useEffect(() => {
        if(subtask !== '' && subtask)  setSubtasks([...subtask])
    }, [subtask])

    return (
        <div className='taskContent'>
            <section>
                <h3 className='taskTitle'>Task: {task?.title}</h3>
                <br />
                {task?.content}
            </section>
            <div className='subtasks'>
                <br />
                <DialogModal dialogClass='' forTask={false} currentTask={currentTask} />
                {
                        subtasks.map((item, index) => {
                            return  <SubtaskItem
                                        currentTask={currentTask}
                                        key={index}
                                        data={item}                                                   
                                    />
                    })
                }
            </div>
    </div>
    )
}
