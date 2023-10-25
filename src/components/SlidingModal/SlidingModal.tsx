import React, { Dispatch, FC } from 'react'
import { useDispatch } from 'react-redux'
import { statusController } from '../../services/Status/statusController'
import { SubtaskData } from '../../types/task'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { useActions } from '../../hooks/useActions'
import { ArrowRightOutlined, RightOutlined } from '@ant-design/icons'
import  './SlidingModal.scss'

type SlidingModalProps = {
    dialogClass: string,
    inputClass: string,
    forSubtask: boolean,
    subtask?: SubtaskData,
    status?: string,
    forPriority?: boolean,
    priority?: string,
}

export const SlidingModal:FC<SlidingModalProps> = React.memo(({
    dialogClass,
    inputClass,
    forSubtask,
    subtask,
    status,
    forPriority,
    priority
}) => {
    const {currentTask} = useTypedSelector(state => state.currentTask)
    const {fetchSubtask} = useActions()
    const dispatch:Dispatch<any> = useDispatch()

    const updatePriorityOrStatus = (status:string, priority:string) => {
        (!forSubtask && !forPriority)
            ? 
                statusController('update', currentTask!, status, dispatch)
            : 
                (!forPriority) 
            ?
                fetchSubtask('update', currentTask, subtask, status, dispatch)
            :
                statusController('priority', currentTask!, '', dispatch, priority)   
    }

    return (
        <div className={'slidingModal'}>            
            <input 
                type="checkbox" 
                className={`toggle__${dialogClass}`} 
                id={`${inputClass}`}
            />
            <label 
                className='checkbox' 
                htmlFor={`${inputClass}`}
            >
            {   (!forSubtask && !forPriority) 
                    ? 
                        `${status}` 
                    : 
                        (!forPriority) 
                    ?  
                        <ArrowRightOutlined style={{fontSize: '1.5vh'}}/>
                    : 
                        `${priority}`
            }  
            </label>
            <dialog className={ dialogClass || 'dialog'}>
                <label 
                    className='btn-checkbox' 
                    htmlFor={`${inputClass}`}
                    onClick={() => updatePriorityOrStatus('queue', '1')}
                >
                   {(forPriority) ? '1': 'Queue'} 
                </label>
                <label 
                    className='btn-checkbox' 
                    htmlFor={`${inputClass}`}
                    onClick={() => updatePriorityOrStatus('development', '2')}
                >
                    {(forPriority) ? '2': 'Development'}
                </label>
                <label 
                    className='btn-checkbox' 
                    htmlFor={`${inputClass}`}
                    onClick={() => updatePriorityOrStatus('done', '3')}
                >
                    {(forPriority) ? '3': 'Done'}
                </label>   
            </dialog>
        </div>
    )
})
