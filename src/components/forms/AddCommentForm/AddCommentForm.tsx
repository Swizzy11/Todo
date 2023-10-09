import { Dispatch, FC, useState } from 'react'
import { Button } from '../../block/Button'
import { useDispatch } from 'react-redux'
import { fetchComment } from '../../../store/action-creator/comment'
import { createComment } from '../../../utils/hooks/createComment'
import { TaskData } from '../../../types/task'
import './AddCommentForm.scss'

type AddCommentFormProps = {
    currentTask: TaskData
}

export const AddCommentForm:FC<AddCommentFormProps> = ({
    currentTask
}) => {
    const [commentValue, setNewComment] = useState('')
    const dispatch:Dispatch<any> = useDispatch()

    const addComment:React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        if(commentValue === '') return
        
        dispatch(fetchComment(
                                'add',
                                currentTask, 
                                createComment(currentTask, commentValue, `${Date.now()}`)
                            ))
        setNewComment('')
    }

    return (
        <form 
            action="" 
            className='addComments' 
            onSubmit={addComment}
        >
            <textarea
                rows={5} 
                placeholder='Ваш комментарий...'
                value={commentValue} 
                onChange={(e) => 
                        setNewComment(e.currentTarget.value)
                    }
            >
            </textarea>
            <Button classname='btn-back' type={'submit'}>
                Добавить
            </Button>
        </form>
    )
}
