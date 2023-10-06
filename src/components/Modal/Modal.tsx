import React, { FC, ReactEventHandler } from 'react'
import './Modal.scss'

type ModalProps = {
    inputValue?: string,
    textareaValue?: string,
    onChangeInput?: React.ChangeEventHandler<HTMLInputElement>,
    onChangeTextarea?: React.ChangeEventHandler<HTMLTextAreaElement>,
    onClick?: ReactEventHandler
}

export const Modal:FC<ModalProps> = ({
    inputValue,
    textareaValue,
    onChangeInput,
    onChangeTextarea,
    onClick
}) => {
  return (
    <div className='modal'>
        <input type="checkbox" id="modalToggle"/>
        <label className='checkbox' htmlFor="modalToggle">
            +
        </label>
        <div className="backgroundModal" id="modalPopup">
            <div className="backgroundModal__content">
                <label 
                    className='modalLabel' 
                    style={{textAlign: 'end', cursor: 'pointer'}} 
                    htmlFor="modalToggle"
                >
                    X
                </label>
                <label className='modalLabel' htmlFor="title-task">
                    Название
                </label>
                <input 
                    type="text" 
                    className='taskText'
                    name='title-task'
                    value={inputValue}
                    onChange={onChangeInput}
                />
                <label className='modalLabel' htmlFor="modalTextarea">
                    Текст здачи
                </label>
                <textarea 
                    className='taskText'
                    rows={9} 
                    name='content-task'
                    id='modalTextarea'
                    value={textareaValue}
                    onChange={onChangeTextarea} 
                />
                <label 
                        className='btn-checkbox' 
                        htmlFor="modalToggle"
                        onClick={onClick} 
                    >
                        Добавить
                    </label>
            </div>
        </div>
    </div>
  )
}

