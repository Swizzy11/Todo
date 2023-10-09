import { combineReducers } from "redux";
import { projectsReducer } from "./projectsReducer";
import { taskReducer } from "./tasksReducer";
import { currentTaskReducer } from "./currentTaskReducer";
import { subtaskReducer } from "./subtaskReducer";
import { commentsReducer } from "./commentsReducer";
import { subcommentsReducer } from "./subcommentsReducer";


export const rootReducer = combineReducers({
    projects: projectsReducer,
    tasks: taskReducer,
    currentTask: currentTaskReducer,
    subtask: subtaskReducer,
    comments: commentsReducer,
    subcommets: subcommentsReducer
})

