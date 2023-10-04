import { FC } from 'react'
import { CommentItem } from '../block/CommentItem'
import { useTypedSelector } from '../../utils/hooks/useTypedSelector'
import './Comments.scss'

export const Comments:FC = ({
 
}) => {
    const {comments} = useTypedSelector(state => state.comments)

    return (
        <div className='comments'>
            <br />
            {
                comments.map((item) => {
                    return <CommentItem 
                                data={item}
                            />
                })
            }
        </div>
    )
}
