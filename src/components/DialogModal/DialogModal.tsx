import { Dispatch, FC } from 'react'
import { useDispatch } from 'react-redux'
import { fetchSubtask } from '../../store/action-creator/subtask'
import { statusController } from '../../services/Status/statusController'
import { SubtaskData } from '../../types/task'
import { useTypedSelector } from '../../utils/hooks/useTypedSelector'
import  './DialogModal.scss'

type DialogModalProps = {
    dialogClass: string,
    inputClass: string,
    forSubtask: boolean,
    subtask?: SubtaskData,
    status?: string,
    forPriority?: boolean,
    priority?: string,
}

export const DialogModal:FC<DialogModalProps> = ({
    dialogClass,
    inputClass,
    forSubtask,
    subtask,
    status,
    forPriority,
    priority
}) => {
    const dispatch:Dispatch<any> = useDispatch()
    const {currentTask} = useTypedSelector(state => state.currentTask)

    return (
        <div className={'dialogModal'}>            
            <input 
                type="checkbox" 
                className={`toggle__${dialogClass}`} 
                id={`${inputClass}`}
            />
            <label 
                className='checkbox' 
                htmlFor={`${inputClass}`}
            >
              {(!forSubtask && !forPriority) 
              ? 
                `${status}` 
              : 
                (!forPriority) 
              ? 
                '>' 
              : 
                `${priority}`}  
            </label>
            <dialog className={ dialogClass || 'dialog'}>
                <label 
                    className='btn-checkbox' 
                    htmlFor={`${inputClass}`}
                    onClick={() => {
                        (!forSubtask && !forPriority)
                        ? 
                            statusController(
                                'update',
                                currentTask!, 
                                'queue', 
                                dispatch
                            )
                        : (!forPriority) 
                        ?
                            dispatch(fetchSubtask(
                                'update', 
                                currentTask, 
                                subtask, 
                                'queue', 
                                dispatch
                            ))
                        :
                        statusController(
                            'priority', 
                            currentTask!, 
                            '', 
                            dispatch,
                            '1'
                        )                      
                    }}
                >
                   {(forPriority) ? '1': 'Queue'} 
                </label>
                <label 
                    className='btn-checkbox' 
                    htmlFor={`${inputClass}`}
                    onClick={() => {
                        (!forSubtask && !forPriority)
                        ? 
                            statusController(
                                'update', 
                                currentTask!, 
                                'development', 
                                dispatch
                            )
                        : (!forPriority) 
                        ? 
                            dispatch(fetchSubtask(
                                'update', 
                                currentTask, 
                                subtask, 
                                'development',
                                dispatch
                            ))
                            
                        : statusController(
                            'priority', 
                            currentTask!, 
                            '', 
                            dispatch,
                            '2'
                        )  
                    }}
                >
                    {(forPriority) ? '2': 'Development'}
                </label>
                <label 
                    className='btn-checkbox' 
                    htmlFor={`${inputClass}`}
                    onClick={() => {
                        (!forSubtask && !forPriority)
                        ? 
                            statusController(
                                'update', 
                                currentTask!, 
                                'doneTasks', 
                                dispatch
                            )
                        : (!forPriority) 
                        ?  
                            dispatch(fetchSubtask(
                                'update', 
                                currentTask, 
                                subtask, 
                                'done', 
                                dispatch
                            ))
                        : statusController(
                            'priority', 
                            currentTask!, 
                            '', 
                            dispatch,
                            '3'
                        ) 
                    }}
                >
                    {(forPriority) ? '3': 'Done'}
                </label>   
            </dialog>
        </div>
    )
}
