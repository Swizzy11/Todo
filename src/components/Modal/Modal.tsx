import React, { FC, ReactEventHandler } from 'react'
import './Modal.scss'

type ModalProps = {
    inputValue?: string,
    textareaValue?: string,
    onChangeInput?: React.ChangeEventHandler<HTMLInputElement>,
    onChangeTextarea?: React.ChangeEventHandler<HTMLTextAreaElement>,
    onClick?: ReactEventHandler,
    forSubtask: boolean,
    subtaskModalClass: string,
    forComments: boolean,
    subcommentsClass?: string
}

export const Modal:FC<ModalProps> = ({
    inputValue,
    textareaValue,
    onChangeInput,
    onChangeTextarea,
    onClick,
    forSubtask,
    subtaskModalClass,
    forComments,
    subcommentsClass
}) => {
  return (
    <div className='modal'>
                {
                    (!forComments)
                    ?   
                        <>
                            <input 
                                type="checkbox" 
                                className='modalToggle' 
                                id={`modalToggle${subtaskModalClass}`}
                            />

                            {(forSubtask) ? 'Подзадачи' : ''}
                            {(forComments) ? 'Комментирова': ''} &nbsp;

                            <label 
                                className='label-checkbox' 
                                htmlFor={`modalToggle${subtaskModalClass}`}
                            >
                                {(forSubtask) ? '(+)' : '+'}
                            </label>

                            <div className="backgroundModal" id="modalPopup">
                                <div className="backgroundModal__content">
                                    <label
                                        className='modalLabel'
                                        style={{ textAlign: 'end', cursor: 'pointer' }}
                                        htmlFor={`modalToggle${subtaskModalClass}`}
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
                                    <label 
                                        className='modalLabel' 
                                        htmlFor="modalTextarea"
                                    >
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
                                        htmlFor={`modalToggle${subtaskModalClass}`}
                                        onClick={onClick}
                                    >
                                    Добавить
                                    </label>
                                </div>
                            </div>
                        </>
                :
                    <>
                        <input 
                            type="checkbox" 
                            className='modalToggleComment' 
                            id={`${subcommentsClass}`}
                        />
                        <label 
                            className='checkbox' 
                            htmlFor={`${subcommentsClass}`}
                        >
                            Комментировать
                        </label>
                        <div className="backgroundModalComment" id="modalPopup">
                            <div className="backgroundModalComment__content">
                                <label
                                    className='modalLabel'
                                    style={{ textAlign: 'end', cursor: 'pointer' }}
                                    htmlFor={`${subcommentsClass}`}
                                >
                                    X
                                </label>
                                <label 
                                    className='modalLabel' 
                                    htmlFor="modalTextarea"
                                >
                                    Ваш комментарий
                                </label>
                                <textarea
                                    className='commentText'
                                    rows={9}
                                    name='content-task'
                                    id='modalTextarea'
                                    value={textareaValue}
                                    onChange={onChangeTextarea} 
                                />
                                <label
                                    className='btn-checkbox'
                                    htmlFor={`${subcommentsClass}`}
                                    onClick={onClick}
                                >
                                    Добавить
                                </label>
                                </div>
                            </div>
                    </>
                    }
         
    </div>
  )
}

