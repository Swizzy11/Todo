import { Dispatch, FC } from 'react'
import { SubtaskData } from '../../../types/task'
import { Button } from '../Button'
import { useDispatch } from 'react-redux'
import { fetchSubtask } from '../../../store/action-creator/subtask'
import { DialogModal } from '../../DialogModal'
import { useTypedSelector } from '../../../utils/hooks/useTypedSelector'
import './SubtaskItem.scss'

type SubtaskItemProps = {
    key: string | number,
    data: SubtaskData,
    inputClass: string
}

export const SubtaskItem:FC<SubtaskItemProps> = ({
    key,
    data,
    inputClass
}) => {
    const dispatch:Dispatch<any> = useDispatch()
    const {currentTask} = useTypedSelector(state => state.currentTask)
    return (
        <div className='subtaskItem' key={key}> 
            <span>
                <span>Задача: {data.title} | Статус
                    <DialogModal 
                        forTask={true}
                        dialogClass={'dialogForStatusBar__subtask'}
                        inputClass={inputClass} 
                        forSubtask={true}
                        subtask={data}                            
                    /> &nbsp;&nbsp;
                    :&nbsp; {data.status} 
                </span>  
                    <Button 
                        type={'button'} 
                        classname='btn-delete'
                        onClick={()=>dispatch(fetchSubtask('delete', currentTask, data))}
                    >
                        Delete
                        </Button>
            </span>
            <span className='subtaskContent'>
                {data.content}
            </span>
            <time>Создано: {data.createTime} | Закрыто: {data.closeTime}</time>
        </div>
    )
}
