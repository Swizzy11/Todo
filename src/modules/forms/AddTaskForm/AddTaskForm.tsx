import { FC, ReactEventHandler, useState } from "react"
import { createNewSubtask, createTask } from "../../../utils/createTask"
import { Button, Modal, Row, Tooltip, Form, Input } from "antd"
import { useTypedSelector } from "../../../hooks/useTypedSelector"
import { PlusOutlined } from "@ant-design/icons"
import { rules } from "../../../utils/rules"
import { useActions } from "../../../hooks/useActions"
import './AddTaskForm.scss'

const { TextArea } = Input;

type AddTaskFormProps = {
    forSubtask: boolean
}

type FieldType = {
    title?: string;
    content?: string
  }

export const AddTaskForm:FC<AddTaskFormProps> = ({
    forSubtask
}) => {
    const {currentTask} = useTypedSelector(state => state.currentTask)
    const [inputValue, setInputValue] = useState('')
    const [textareaValue, setTextareaValue] = useState('')
    const [isVisible, setVisible] = useState(false)
    const [inputErrorVisible, setInputErrorVisible] = useState(true)
    const [textareaErrorVisible, setTextareaErrorVisible] = useState(true)
    const {fetchTasks, fetchCurrentTask, fetchSubtask} = useActions()

    const fetchTaskFunc = () => {
        fetchTasks('add', createTask(inputValue, textareaValue))
        fetchCurrentTask('add',createTask(inputValue, textareaValue))
        fetchSubtask('update')
    }

    const fetchSubtaskFunc = () => {
            fetchSubtask(
                'add', 
                currentTask, 
                createNewSubtask(inputValue, textareaValue, currentTask)
            )
    }

    const onClick:ReactEventHandler = () => {  
        if(inputValue !== '' && textareaValue !== '') {
    
            (forSubtask) ? fetchSubtaskFunc() : fetchTaskFunc()

            setInputValue('')
            setTextareaValue('')
            setInputErrorVisible(true)
            setTextareaErrorVisible(true)
            setVisible(false)
        }else {
            setInputErrorVisible(false)
            setTextareaErrorVisible(false)
        }
    }

    const onChangeInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setInputValue(e.target.value)

        if(e.target.value === '') {
            setInputErrorVisible(false)
        }else {
            setInputErrorVisible(true)
        }
    }

    const onChangeTextarea: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        setTextareaValue(e.target.value)

        if(e.target.value === '') {
            setTextareaErrorVisible(false)
        }else {
            setTextareaErrorVisible(true)
        }
    }

    return (
        <>
            {forSubtask ? 'Подзадачи ': ''}
            {forSubtask 
                ?
                    <Tooltip title="Добавить"> 
                        <Button 
                            shape="circle" 
                            icon={<PlusOutlined />} 
                            style={{background: 'none', color:'white', border:'none'}} 
                            onClick={() => setVisible(true)}
                        />
                    </Tooltip>
                :
                    <Button 
                        type='text'
                        shape="circle" 
                        style={{color:'white'}} 
                        onClick={() => setVisible(true)}
                    >
                        +
                    </Button>
            }
            <Modal
                title="Добавить задачу"
                footer={null}
                open={isVisible}
                onCancel={() => setVisible(false)}
            >
                <Form>
                    <Form.Item>
                        <Input 
                            size="large" 
                            placeholder="Название задачи"
                            value={inputValue} 
                            onChange={onChangeInput}
                        />
                        <span 
                            style={{
                                    color:'red', 
                                    visibility: (inputErrorVisible) ? 'hidden': 'visible'
                                }}
                        >
                            {rules.required().message}
                        </span>
                    </Form.Item>
                    <Form.Item>
                        <TextArea
                            value={textareaValue}
                            onChange={onChangeTextarea}
                            placeholder="Текст задачи"
                            autoSize={{ minRows: 3, maxRows: 5 }}
                        />
                        <span 
                            style={{
                                    color:'red', 
                                    visibility: (textareaErrorVisible) ? 'hidden': 'visible',
                                }}
                        >
                            {rules.required().message}
                        </span>                    
                    </Form.Item>
                    <Form.Item >
                        <Row justify={'end'}>
                            <Button htmlType="submit" onClick={onClick}>Добавить</Button>
                        </Row>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
