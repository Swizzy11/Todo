import { FC, useCallback, useEffect, useState } from 'react'
import { CommentData } from '../../../types/comment'
import { Button } from '../Button'
import { createComment } from '../../../utils/createComment'
import { useTypedSelector } from '../../../utils/hooks/useTypedSelector'
import { Subcomment } from '../Subcomment'
import { Modal } from '../../Modal'
import { useActions } from '../../../utils/hooks/useActions'
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
                    <Button 
                        type={'button'} 
                        classname="btn-deleteComment" 
                        onClick={onClick}
                    >
                        x
                    </Button>
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
