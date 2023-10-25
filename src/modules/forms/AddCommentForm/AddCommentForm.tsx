import { FC, useState } from 'react'
import { ButtonHost } from '../../../UI/ButtonHost'
import { createComment } from '../../../utils/createComment'
import { TaskData } from '../../../types/task'
import { useActions } from '../../../hooks/useActions'
import './AddCommentForm.scss'

type AddCommentFormProps = {
    currentTask: TaskData
}

export const AddCommentForm:FC<AddCommentFormProps> = ({
    currentTask
}) => {
    const [commentValue, setNewComment] = useState('')
    const {fetchComment} = useActions()

    const addComment:React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        if(commentValue === '') return
        
        fetchComment(
                        'add',
                        currentTask, 
                        createComment(currentTask, commentValue, `${Date.now()}`)
                    )
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
                        setNewComment(e.target.value)
                    }
            >
            </textarea>
            <ButtonHost classname='btn-back' type={'submit'}>
                Добавить
            </ButtonHost>
        </form>
    )
}
