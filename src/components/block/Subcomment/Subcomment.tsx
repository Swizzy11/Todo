import { Dispatch, FC, ReactEventHandler, useEffect, useState } from "react"
import { CommentData } from "../../../types/comment"
import { createComment } from "../../../utils/createComment"
import { useTypedSelector } from "../../../utils/hooks/useTypedSelector"
import './Subcomment.scss'
import { useDispatch } from "react-redux"
import { Modal } from "../../Modal"
import { fetchSubcomment } from "../../../store/action-creator/subcomments"
import { Button } from "../Button"
import { storage } from "../../../services/LocalStorage/LocalStorage"

type SubcommentType = {
    data: CommentData,
    deleteSubcomments: () => void
}

export const Subcomment:FC<SubcommentType> = ({
    data,
    deleteSubcomments
}) => {
    const {currentTask} = useTypedSelector(state => state.currentTask)
    const {subcomments} = useTypedSelector(state => state.subcommets)

    const [textareaValue, setTextareaValue] = useState('')

    const dispatch:Dispatch<any> = useDispatch()

    const addSubcomments = () => {
        
        if(textareaValue !== '') {
            setTextareaValue('')
            const newComment = createComment(
                                    currentTask, 
                                    textareaValue, 
                                    data?.id!
                                )

            dispatch(fetchSubcomment('add', data, newComment))

            
        }else {
            console.log('Введите название')
        }
    }

    return (
        <>
            <blockquote className="subcomment" >
                <div className='buttonWrapper'>
                    <Button 
                        type={'button'} 
                        classname="btn-add" 
                        onClick={deleteSubcomments}
                    >
                        x
                    </Button>
                </div>
                <p>
                {data?.content}
                </p>
                <div className="time">
                    {data?.createTime}
                    <div className='modalWrapper'>
                        <Modal 
                            forSubtask={false} 
                            subtaskModalClass={""} 
                            forComments={true}
                            subcommentsClass={`${data.id}`}
                            onChangeTextarea={(e) => 
                                    setTextareaValue(e.currentTarget.value)
                                    }
                            onClick={addSubcomments}
                        />
                    </div>
                </div>
                {
                    subcomments.map((item, index) => {
  
                        const deleteSubcomment = () => {
                            dispatch(fetchSubcomment('delete', data, item))
                        }
                        return (
                                (item.commentID === data.id)
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
