import { FC } from 'react'
import { CommentItem } from '../CommentItem'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { CommentData } from '../../types/comment'
import { useActions } from '../../hooks/useActions'
import './Comments.scss'

export const Comments:FC = () => {
    const {currentTask} = useTypedSelector(state => state.currentTask)
    const {comments} = useTypedSelector(state => state.comments)
    const {fetchComment} = useActions()

    return (
        <div className='comments'>
            <br />
            {
                comments.map((item:CommentData, index) => {
                    return (
                            (item.taskID === currentTask.id)
                            ?
                                <CommentItem
                                            key={index}
                                            onClick={() =>fetchComment('delete', currentTask, item)} 
                                            data={item}
                                        />
                            : 
                                <></>
                            )
                })
            }
        </div>
    )
}
