import { FC } from 'react'
import './Files.scss'

type FilesProps = {
    fileName: string,
}

export const Files:FC<FilesProps> = ({
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
