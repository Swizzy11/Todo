import * as CommentActionCreators  from "../../store/action-creator/comment";
import * as CurrentTaskActionCreators  from "../../store/action-creator/currentTask";
import * as SubcommentActionCreators  from "../../store/action-creator/subcomments";
import * as TasksActionCreators from "../../store/action-creator/task";
import * as SubtaskActionCreators  from "../../store/action-creator/subtask";
import * as ProjectsActionCreators from "../../store/action-creator/project";

export default {
    ...CommentActionCreators,
    ...CurrentTaskActionCreators,
    ...SubcommentActionCreators,
    ...TasksActionCreators,
    ...SubtaskActionCreators,
    ...ProjectsActionCreators,
}
