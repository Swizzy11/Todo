import { Dispatch, FC, useEffect, useState } from 'react'
import { CommentData } from '../../../types/comment'
import { Button } from '../Button'
import { createComment } from '../../../utils/createComment'
import { useTypedSelector } from '../../../utils/hooks/useTypedSelector'
import { Subcomment } from '../Subcomment'
import { Modal } from '../../Modal'
import { useDispatch } from 'react-redux'
import { fetchSubcomment } from '../../../store/action-creator/subcomments'
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

    const dispatch:Dispatch<any> = useDispatch()
    
    const addSubcomment = () => {
        setTextareaValue('')
        dispatch(fetchSubcomment(
                        'add', 
                        data, 
                        createComment(
                            currentTask, 
                            textareaValue, 
                            data!.id
                        )
                    )
                )  
    }
    useEffect(() => {
        dispatch(fetchSubcomment('get', data))
    }, [])

    useEffect(() => {     
        setSubcomment([...subcomments])
    }, [subcomments])

    return (
        <>
            <blockquote className="comment">
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
                        dispatch(fetchSubcomment('delete', data, item))
                    }
                    return (
                        (item.commentID === data!.id)
                            ?
                                <Subcomment
                                    data={item}
                                    deleteSubcomments={deleteSubcomment} 
                                />
                            :
                                <></>
                        )
                })
            }
            </blockquote>
            
        </>
    )
}
