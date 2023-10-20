import { CommentData } from "../../../types/comment"
import { addSubcomment } from "./addSubcomment"
import { deleteSubcomments } from "./deleteSubcomment"
import { getSubcomments } from "./getSubcomments"

export const subcommentsController = (
    method: string,
    comment: CommentData,
    subcomment?: CommentData,
    ) => {
            switch(method) {
                case('add'):
                    return addSubcomment(comment, subcomment!)
                case('get'): 
                    return getSubcomments(comment)
                case('delete'): 
                    return deleteSubcomments(comment, subcomment!)
                default:
                    return [<>Что то пошло не так</>]
            }  
    }
