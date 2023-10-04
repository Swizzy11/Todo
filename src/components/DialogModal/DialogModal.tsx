import { Dispatch, FC, useState } from 'react'
import { storage } from '../../services/LocalStorage/LocalStorage'
import { useDispatch } from 'react-redux'
import { fetchSubtask } from '../../store/action-creator/subtask'
import { createNewSubtask } from '../../utils/hooks/createTask'
import { Button } from '../block/Button'
import  './DialogModal.scss'
import { statusController } from '../../services/Status/statusController'
import { TaskData } from '../../types/task'

type DialogModalProps = {
    forTask: boolean,
    dialogClass: string,
    currentTask?: TaskData,
}

export const DialogModal:FC<DialogModalProps> = ({
    forTask,
    dialogClass,
    currentTask
}) => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const dispatch:Dispatch<any> = useDispatch()

    const createSubtask = () => {
        const currentTask = storage.get('currentTask')!
        dispatch(fetchSubtask('add', currentTask, createNewSubtask(title, content, JSON.parse(currentTask))))
    }

    return (
        <div className={ 'dialogModal' }>            
                <input type="checkbox" id={`toggle__${dialogClass}`}/>
                { (!forTask) ? 'Подзадачи' : ''}
                <label className='checkbox' htmlFor={`toggle__${dialogClass}`}>
                    { (!forTask) ? '(+)' : '^'}
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
                                            className='taskText' 
                                            rows={3} 
                                            name='content-task'
                                            value={content} 
                                            onChange={(e) => setContent(e.currentTarget.value)} 
                                        />
                                        <label 
                                            className='btn-checkbox' 
                                            htmlFor={`toggle__${dialogClass}`}
                                            onClick={createSubtask} 
                                        >
                                            Добавить
                                        </label>
                                    </>
                                :   <>
                                        <Button 
                                            type={'button'} 
                                            classname='btn-delete' 
                                            onClick={() => {statusController('update', currentTask!, 'inProgress', dispatch)}}
                                        >
                                            <label 
                                                className='btn-checkbox' 
                                                htmlFor={`toggle__${dialogClass}`}
                                                onClick={createSubtask} 
                                            >
                                                In progress
                                            </label>
                                        </Button>
                                        <Button 
                                            type={'button'} 
                                            classname='btn-delete' 
                                            onClick={() => {statusController('update', currentTask!, 'onReview', dispatch)}}
                                        >
                                            <label 
                                                className='btn-checkbox' 
                                                htmlFor={`toggle__${dialogClass}`}
                                                onClick={createSubtask} 
                                            >
                                                On review
                                            </label>
                                        </Button>
                                        <Button 
                                            type={'button'} 
                                            classname='btn-delete' 
                                            onClick={() => {statusController('update', currentTask!, 'doneTasks', dispatch)}}
                                        >
                                            <label 
                                            className='btn-checkbox' 
                                            htmlFor={`toggle__${dialogClass}`}
                                            onClick={createSubtask} 
                                            >
                                                Done
                                            </label>
                                        </Button>
                                    </>
                    }
                    
                    
                </dialog>
        </div>
    )
}
