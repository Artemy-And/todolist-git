import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import EditableSpan from "../../../../components/EditableSpan/EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "../../../../api/todolists-api";


type TaskPropsType = {
    tasks: TaskType
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (id: string, status:TaskStatuses, todolistId: string) => void
    changeTaskTitle: (title: string, id: string, todolistId: string) => void
    taskId: string

}
export const Task = React.memo((props: TaskPropsType) => {

    const onClickHandler = () => props.removeTask(props.tasks.id, props.taskId)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeTaskStatus(props.tasks.id, newIsDoneValue? TaskStatuses.Completed:TaskStatuses.New, props.taskId);
    }
    const onTitleChangeHandler = useCallback((newTitle: string) => {
        props.changeTaskTitle(props.tasks.id, newTitle, props.taskId);
    },[props.changeTaskTitle,props.tasks.id,props.taskId])

    return <div key={props.tasks.id} className={props.tasks.status === TaskStatuses.Completed? "is-done" : ""}>
        <Checkbox color="primary" onChange={onChangeHandler} checked={props.tasks.status === TaskStatuses.Completed}/>
        <EditableSpan title={props.tasks.title} saveTitle={onTitleChangeHandler}/>


        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>
})