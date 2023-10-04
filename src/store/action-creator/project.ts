import { Dispatch, ReactNode } from "react"
import { ProjectAction, ProjectActionTypes } from "../../types/project"
import { projectController } from "../../services/Project/projectController"


export const fetchProjects = (
    setProject: React.Dispatch<React.SetStateAction<ReactNode[]>>
    ) => {
    return async (dispatch: Dispatch<ProjectAction>) => {
        try {
            dispatch({type: ProjectActionTypes.FETCH_PROJECTS})
            const response = projectController('get',[],'',setProject)
            setTimeout(() => {
                dispatch({type: ProjectActionTypes.FETCH_PROJECTS_SUCCESS, payload: response!})
            }, 1000)
        } catch (e) {
            dispatch({type: ProjectActionTypes.FETCH_PROJECTS_ERROR, payload: 'Произошла ошибка при загрузке задач'})
        }
    }
}
