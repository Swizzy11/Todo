import { Dispatch, FC } from 'react'
import { SubtaskData, TaskData } from '../../../types/task'
import { Button } from '../Button'
import { useDispatch } from 'react-redux'
import { fetchSubtask } from '../../../store/action-creator/subtask'
import './SubtaskItem.scss'

type SubtaskItemProps = {
    key: string | number,
    data: SubtaskData,
    currentTask: TaskData
}

export const SubtaskItem:FC<SubtaskItemProps> = ({
    key,
    data,
    currentTask
}) => {
    const dispatch:Dispatch<any> = useDispatch()

    return (
        <div className='subtaskItem' key={key}>
            <span>Задача: {data.title} | Статус: {data.status} 
                <Button 
                    type={'button'} 
                    classname='btn-delete'
                    onClick={()=>dispatch(fetchSubtask('delete', currentTask, data))}
                >
                    Delete
                    </Button>
            </span>
            <span>{data.content}</span>
            <time>Создано: {data.createTime} | {(data.closeTime ! == '') ? `Закрыто: ${data.closeTime}` : ''}</time>
        </div>
    )
}
