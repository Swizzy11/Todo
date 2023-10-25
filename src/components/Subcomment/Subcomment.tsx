import { FC, useState } from "react"
import { CommentData } from "../../types/comment"
import { createComment } from "../../utils/createComment"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import { Modal } from "../../UI/Modal"
import { Button } from "../../UI/Button"
import { useActions } from "../../hooks/useActions"
import './Subcomment.scss'

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
    const {fetchSubcomment} = useActions()

    const addSubcomments = () => {
        
        if(textareaValue !== '') {
            setTextareaValue('')
            const newComment = createComment(
                                    currentTask, 
                                    textareaValue, 
                                    data?.id!
                                )

            fetchSubcomment('add', data, newComment)   
        }else {
            console.log('Введите название')
        }
    }

    return (
            <blockquote className="subcomment">
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
                                    setTextareaValue(e.target.value)
                                    }
                            onClick={addSubcomments}
                        />
                    </div>
                </div>
                {
                    subcomments.map((item, index) => {
  
                        const deleteSubcomment = () => {
                            fetchSubcomment('delete', data, item)
                        }
                        return (
                                (item.commentID === data.id)
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


