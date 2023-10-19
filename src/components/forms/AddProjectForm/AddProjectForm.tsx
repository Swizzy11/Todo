import { Dispatch, FC, useState } from "react"
import { projectController } from "../../../services/Project/projectController"
import { InputWithButton } from "../../InputWithButton"
import './AddProjectForm.scss'
import { createProject } from "../../../utils/createProject"
import { useTypedSelector } from "../../../utils/hooks/useTypedSelector"
import { useDispatch } from "react-redux"
import { fetchProjects } from "../../../store/action-creator/project"


export const AddProjectForm:FC = () => {
    const [inputValue, setValue] = useState('')
    const {projects, loading, error} = useTypedSelector(state => state.projects)
    const dispatch:Dispatch<any> = useDispatch()

    const addProject:React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()

        if(inputValue !== '') {
            dispatch(fetchProjects('add', projects, createProject(inputValue)))
            
            setValue('')
        }
        
     }
    return (
        <form 
            action="_blank" 
            className='addProject' 
            onSubmit={addProject}
        >
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
