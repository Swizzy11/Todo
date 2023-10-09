import { Dispatch, FC } from 'react'
import { CommentItem } from '../block/CommentItem'
import { useTypedSelector } from '../../utils/hooks/useTypedSelector'
import { CommentData } from '../../types/comment'
import { fetchComment } from '../../store/action-creator/comment'
import { useDispatch } from 'react-redux'
import './Comments.scss'

export const Comments:FC = () => {
    const {currentTask} = useTypedSelector(state => state.currentTask)
    const {comments} = useTypedSelector(state => state.comments)
    const dispatch:Dispatch<any> = useDispatch()

    return (
        <div className='comments'>
            <br />
            {
                comments.map((item:CommentData) => {
                    return (
                            (item.taskID === currentTask.id)
                            ?
                                <CommentItem
                                            onClick={() => 
                                                dispatch(fetchComment('delete', currentTask, item))
                                            } 
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
