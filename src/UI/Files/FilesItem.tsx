import { FC } from 'react'
import './FilesItem.scss'

type FilesItemProps = {
    fileName: string,
}

export const FilesItem:FC<FilesItemProps> = ({
    fileName
}) => {
    return (
        <div className="files">
            <div className='imgFile' />
            <span>
                {fileName}
            </span>
        </div>
    )
}
