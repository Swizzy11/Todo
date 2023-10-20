import { FC } from 'react'
import { SubtaskData } from '../../../types/task'
import { Button } from '../Button'
import { DialogModal } from '../../DialogModal'
import { useTypedSelector } from '../../../utils/hooks/useTypedSelector'
import { useActions } from '../../../utils/hooks/useActions'
import './SubtaskItem.scss'
import React from 'react'

type SubtaskItemProps = {
    data: SubtaskData
}

export const SubtaskItem:FC<SubtaskItemProps> = React.memo(({
    data
}) => {
    const {currentTask} = useTypedSelector(state => state.currentTask)
    const {fetchSubtask} = useActions()
    
    return (
        <div className='subtaskItem'> 
            <span>
                <span>Задача: {data.title} | Статус
                    <DialogModal 
                        dialogClass={'dialogForStatusBar__subtask'}
                        inputClass={data.id} 
                        forSubtask={true}
                        subtask={data}                            
                    /> &nbsp;&nbsp;
                    &nbsp; {data.status} 
                </span>  
                    <Button 
                        type={'button'} 
                        classname='btn-delete'
                        onClick={() => 
                                fetchSubtask('delete', currentTask, data)
                            }
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
})
