const FETCH_PROJECTS = 'FETCH_PROJECTS'
const FETCH_PROJECTS_SUCCESS = 'FETCH_PROJECTS_SUCCESS'
const FETCH_PROJECTS_ERROR = 'FETCH_PROJECTS_ERROR'

export interface ProjectData {
    id: string;
    title: string;
}
export interface ProjectState {
    projects: any[];
    loading: boolean;
    error: null | string;
}
export enum ProjectActionTypes {
    FETCH_PROJECTS = 'FETCH_PROJECTS',
    FETCH_PROJECTS_SUCCESS = 'FETCH_PROJECTS_SUCCESS',
    FETCH_PROJECTS_ERROR = 'FETCH_PROJECTS_ERROR'
}
interface FetchProjectsAction {
    type: ProjectActionTypes.FETCH_PROJECTS;
}

interface FetchProjectsSuccessAction {
    type: ProjectActionTypes.FETCH_PROJECTS_SUCCESS;
    payload: any[];
}

interface FetchProjectsErrorAction {
    type: ProjectActionTypes.FETCH_PROJECTS_ERROR;
    payload: string;
}
export type ProjectAction = FetchProjectsAction | FetchProjectsSuccessAction | FetchProjectsErrorAction
