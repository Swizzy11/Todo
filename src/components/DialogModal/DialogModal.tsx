import { Dispatch, FC, useState } from 'react'
import { storage } from '../../services/LocalStorage/LocalStorage'
import { useDispatch } from 'react-redux'
import { fetchSubtask } from '../../store/action-creator/subtask'
import { createNewSubtask } from '../../utils/hooks/createTask'
import { statusController } from '../../services/Status/statusController'
import { SubtaskData } from '../../types/task'
import { useTypedSelector } from '../../utils/hooks/useTypedSelector'
import  './DialogModal.scss'

type DialogModalProps = {
    forTask: boolean,
    dialogClass: string,
    inputClass: string,
    forSubtask: boolean,
    subtask?: SubtaskData
}

export const DialogModal:FC<DialogModalProps> = ({
    forTask,
    dialogClass,
    inputClass,
    forSubtask,
    subtask
}) => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const dispatch:Dispatch<any> = useDispatch()
    const {currentTask} = useTypedSelector(state => state.currentTask)

    const createSubtask = () => {
        const currentTask = storage.get('currentTask')
        if(title !== '' && content !== '') {
            dispatch(fetchSubtask(
                                'add', 
                                currentTask, 
                                createNewSubtask(title, content, currentTask)
                            ))
            setTitle('')
            setContent('')
        }
    }

    return (
        <div className={'dialogModal'}>            
                <input 
                    type="checkbox" 
                    className={`toggle__${dialogClass}`} 
                    id={`${inputClass}`}
                />
                { (!forTask) ? 'Подзадачи' : ''}

                <label 
                    className='checkbox' 
                    htmlFor={`${inputClass}`}
                >
                    { (!forTask) ? <>&nbsp;(+)</> : '^'}
                </label>

                <dialog className={ dialogClass || 'dialog'}>
                    {
                        (!forTask) 
                                ?   <>
                                        <label htmlFor="title-task">
                                            Название
                                        </label>
                                        <input 
                                            type="text" 
                                            className='taskText'
                                            name='title-task'
                                            value={title} 
                                            onChange={(e) => setTitle(e.currentTarget.value)}  
                                        />
                                        <label htmlFor="title-task">
                                            Текст задачи
                                        </label> 
                                        <textarea 
                                            className='taskText textarea' 
                                            rows={3} 
                                            name='content-task'
                                            value={content} 
                                            onChange={(e) => setContent(e.currentTarget.value)} 
                                        />
                                        <label 
                                            className='btn-checkbox' 
                                            htmlFor={`${inputClass}`}
                                            onClick={createSubtask} 
                                        >
                                            Добавить
                                        </label>
                                    </>
                                :   <>
                                        <label 
                                            className='btn-checkbox' 
                                            htmlFor={`${inputClass}`}
                                            onClick={() => {
                                                (forSubtask)
                                                ? dispatch(fetchSubtask(
                                                                        'update', 
                                                                        currentTask, 
                                                                        subtask, 
                                                                        'inProgress', 
                                                                        dispatch
                                                                    ))
                                                : statusController(
                                                                    'update',
                                                                        currentTask!, 
                                                                        'inProgress', 
                                                                        dispatch
                                                                    )
                                            }}
                                        >
                                            In progress
                                        </label>
                                        <label 
                                            className='btn-checkbox' 
                                            htmlFor={`${inputClass}`}
                                            onClick={() => {
                                                (forSubtask)
                                                ? dispatch(fetchSubtask(
                                                                        'update', 
                                                                        currentTask, 
                                                                        subtask, 
                                                                        'onReview',
                                                                        dispatch
                                                                    ))
                                                : statusController(
                                                                    'update', 
                                                                    currentTask!, 
                                                                    'onReview', 
                                                                    dispatch
                                                                )
                                            }}
                                        >
                                            On review
                                        </label>
                                        <label 
                                            className='btn-checkbox' 
                                            htmlFor={`${inputClass}`}
                                            onClick={() => {
                                               (forSubtask) 
                                               ? dispatch(fetchSubtask(
                                                                        'update', 
                                                                        currentTask, 
                                                                        subtask, 
                                                                        'done', 
                                                                        dispatch
                                                                    ))
                                               : statusController(
                                                                    'update', 
                                                                    currentTask!, 
                                                                    'doneTasks', 
                                                                    dispatch
                                                                )
                                            }}
                                        >
                                            Done
                                        </label>
                                    </>
                    }
                    
                    
                </dialog>
        </div>
    )
}
