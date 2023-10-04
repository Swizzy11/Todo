import { FC, ReactNode, useState } from "react"
import { projectController } from "../../../services/Project/projectController"
import { InputWithButton } from "../../InputWithButton"
import './AddProjectForm.scss'

export type AddProjectFormProps = {
    setProject: React.Dispatch<React.SetStateAction<ReactNode[]>>,
    projects: ReactNode[]
}

export const AddProjectForm:FC<AddProjectFormProps> = ({
    setProject,
    projects
}) => {
    const [inputValue, setValue] = useState('')

    const addProject:React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()

        if(inputValue !== '') {
            projectController('add', projects, inputValue, setProject)
            setValue('')
        }
        
     }
    return (
        <form action="_blank" className='addProject' onSubmit={addProject}>
                <InputWithButton
                    groupClass=""
                    inputValue={inputValue}
                    onChangeInput={(e) => setValue(e.currentTarget.value)} 
                    inputClass={'forAddProject'} 
                    textLabel={'Название проекта'}
                    buttonType={"submit"}
                    buttonClass={"btn-addProject"}
                    buttonContent={"Добавить"}
                />
        </form>
    )
}
