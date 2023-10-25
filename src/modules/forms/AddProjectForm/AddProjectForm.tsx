import { FC, useCallback, useState } from "react"
import { InputWithButton } from "../../../components/InputWithButton"
import { createProject } from "../../../utils/createProject"
import { useTypedSelector } from "../../../hooks/useTypedSelector"
import { useActions } from "../../../hooks/useActions"
import './AddProjectForm.scss'

export const AddProjectForm:FC = () => {
    const [inputValue, setValue] = useState('')
    const {projects, loading, error} = useTypedSelector(state => state.projects)
    const {fetchProjects} = useActions()

    const addProject:React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()

        if(inputValue !== '') {
            fetchProjects('add', projects, createProject(inputValue))
            setValue('')
        }
        
    }

    const onChange = useCallback((e:React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }, [])

    return (
        <form 
            action="_blank" 
            className='addProject' 
            onSubmit={addProject}
        >
                <InputWithButton
                    groupClass=""
                    inputValue={inputValue}
                    onChangeInput={onChange} 
                    inputClass={'forAddProject'} 
                    textLabel={'Название проекта'}
                    buttonType={"submit"}
                    buttonClass={"btn-addProject"}
                    buttonContent={"Добавить"}
                />
        </form>
    )
}
