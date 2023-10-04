import { ProjectAction, ProjectActionTypes, ProjectState } from "../../types/project"

const inititalState: ProjectState = {
    projects: [],
    loading: false,
    error: null
}

export const projectsReducer = (state = inititalState, action: ProjectAction):ProjectState => {
    switch (action.type) {
        case ProjectActionTypes.FETCH_PROJECTS:
            return {loading: true, error: null, projects: []}
        case ProjectActionTypes.FETCH_PROJECTS_SUCCESS:
            return {loading: false, error: null, projects: action.payload}
        case ProjectActionTypes.FETCH_PROJECTS_ERROR:
            return {loading: false, error: action.payload, projects: []}
        default:
            return state
    }
}
