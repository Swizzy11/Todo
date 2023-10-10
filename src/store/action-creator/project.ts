import { Dispatch, ReactNode } from "react"
import { ProjectAction, ProjectActionTypes, ProjectData } from "../../types/project"
import { projectController } from "../../services/Project/projectController"


export const fetchProjects = (
    method: string,
    projects?: ProjectData[],
    currentProject?: ProjectData
    ) => {
    return async (dispatch: Dispatch<ProjectAction>) => {
        try {
            dispatch({type: ProjectActionTypes.FETCH_PROJECTS})
            const response = projectController(method, projects, currentProject)

            setTimeout(() => {
                dispatch({type: ProjectActionTypes.FETCH_PROJECTS_SUCCESS, payload: response!})
            }, 1000)
            
        } catch (e) {
            dispatch({type: ProjectActionTypes.FETCH_PROJECTS_ERROR, payload: 'Произошла ошибка при загрузке задач'})
        }
    }
}
