import React, { FC } from 'react'
import { SubtaskData } from '../../types/task'
import { ButtonHost } from '../../UI/ButtonHost'
import { SlidingModal } from '../SlidingModal'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { useActions } from '../../hooks/useActions'
import './SubtaskItem.scss'

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
                    <SlidingModal 
                        dialogClass={'dialogForStatusBar__subtask'}
                        inputClass={data.id} 
                        forSubtask={true}
                        subtask={data}                            
                    /> 
                    &nbsp;&nbsp;{data.status} 
                </span>  
                    <ButtonHost 
                        type={'button'} 
                        classname='btn-delete'
                        onClick={() => 
                                fetchSubtask('delete', currentTask, data)
                            }
                    >
                        Delete
                    </ButtonHost>
            </span>
            <span className='subtaskContent'>
                {data.content}
            </span>
            <time>Создано: {data.createTime} | Закрыто: {data.closeTime}</time>
        </div>
    )
})
