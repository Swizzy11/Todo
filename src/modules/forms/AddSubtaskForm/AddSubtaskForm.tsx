import { FC, ReactEventHandler, useCallback, useState } from "react"
import { createTask } from "../../../utils/createTask"
import { Button, Input, Modal, Row } from "antd"
import { useActions } from "../../../hooks/useActions"
import './AddTaskForm.scss'
import { Form } from "antd"
import TextArea from "antd/es/input/TextArea"

export const AddTaskForm:FC = () => {
    const [inputValue, setInputValue] = useState('')
    const [textareaValue, setTextareaValue] = useState('')
    const {fetchTasks, fetchCurrentTask, fetchSubtask} = useActions()
    const [isVisible, setVisible] = useState(false)

    const onClick:ReactEventHandler = () => {
        if(inputValue !== '') {
            fetchTasks('add', createTask(inputValue, textareaValue))
            fetchCurrentTask('add',createTask(inputValue, textareaValue))
            fetchSubtask('update')

            setInputValue('')
            setTextareaValue('')
            setVisible(false)
        }else {
            console.log('Введите название')
        }
    }
    
    const onChangeInput = useCallback((e:React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }, [])

    const onChangeTextarea = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextareaValue(e.target.value)
    }, [])

    return (

        <>
            <Button type="text" style={{color:'white'}} onClick={() => setVisible(true)}>+</Button>
            <Modal
                title="Добавить задачу"
                footer={null}
                visible={isVisible}
                onCancel={() => setVisible(false)}
            >
                <Form>
                    <Form.Item>
                        <Input 
                            size="large" 
                            placeholder="Название задачи"
                            value={inputValue} 
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item>
                        <TextArea
                            value={textareaValue}
                            onChange={(e) => setTextareaValue(e.target.value)}
                            placeholder="Текст задачи"
                            autoSize={{ minRows: 3, maxRows: 5 }}
                        />
                    </Form.Item>
                    <Row justify={'end'}>
                        <Button onClick={onClick}>Добавить</Button>
                    </Row>
                </Form>
            </Modal>
        </>
    )
}
