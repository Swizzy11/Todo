import { FC } from 'react'
import { CommentData } from '../../../types/comment'
import './CommentItem.scss'

type CommentItemProps = {
    data?: CommentData
}

export const CommentItem:FC<CommentItemProps> = ({
    data
}) => {
    
    return (
        <blockquote className="comment">
            <p>
               {data?.content}
            </p>
            <time>
                {data?.createTime}
            </time>
        </blockquote>
    )
}
