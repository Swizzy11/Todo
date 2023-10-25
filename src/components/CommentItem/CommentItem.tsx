import { FC, useEffect, useState } from 'react'
import { CommentData } from '../../types/comment'
import { ButtonHost } from '../../UI/ButtonHost'
import { createComment } from '../../utils/createComment'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { Subcomment } from '../Subcomment'
import { Modal } from '../../UI/Modal'
import { useActions } from '../../hooks/useActions'
import './CommentItem.scss'

type CommentItemProps = {
    data?: CommentData,
    onClick: () => void
}

export const CommentItem:FC<CommentItemProps> = ({
    data,
    onClick
}) => {
    const {currentTask} = useTypedSelector(state => state.currentTask)
    const {subcomments} = useTypedSelector(state => state.subcommets)

    const [textareaValue, setTextareaValue] = useState('')
    const [subcomment, setSubcomment] = useState<Array<CommentData>>([])
    const {fetchSubcomment} = useActions()
    
    const addSubcomment = () => {
        setTextareaValue('')
        fetchSubcomment(
                        'add', 
                        data, 
                        createComment(
                            currentTask, 
                            textareaValue, 
                            data!.id
                        )
                    )
    }

    useEffect(() => {
        fetchSubcomment('get', data)
    }, [])

    useEffect(() => {     
        setSubcomment([...subcomments])
    }, [subcomments])

    return (
            <blockquote className="comment" >
                <div className='buttonWrapper'>
                    <ButtonHost 
                        type={'button'} 
                        classname="btn-deleteComment" 
                        onClick={onClick}
                    >
                        x
                    </ButtonHost>
                </div>
                <p>
                {data?.content}
                </p>
                <time>
                    {data?.createTime}
                    <div className='modalWrapper'>
                        <Modal 
                            forSubtask={false} 
                            subtaskModalClass={""} 
                            forComments={true}
                            subcommentsClass={`${data!.id}`}
                            onChangeTextarea={(e) => setTextareaValue(e.currentTarget.value)}
                            onClick={addSubcomment}
                        />
                    </div>
                </time>
                {
                subcomment.map((item, index) => {
                    const deleteSubcomment = () => {
                        fetchSubcomment('delete', data, item)
                    }

                    return (
                        (item.commentID === data!.id)
                            ?
                                <Subcomment
                                    key={index}
                                    data={item}
                                    deleteSubcomments={deleteSubcomment} 
                                />
                            :
                                <></>
                        )
                })
            }
            </blockquote>
    )
}
