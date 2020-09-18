import React, {useCallback, useEffect} from 'react';
import AddItemForm from "./../../../components/AddItemForm/AddItemForm";
import EditableSpan from "./../../../components/EditableSpan/EditableSpan"
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from './Task/Task';
import {TaskStatuses, TaskType} from "./../../../api/todolists-api";
import {FilterValuesType} from "./todolists-reducer";
import {useDispatch} from "react-redux";
import {getTaskTC} from "./Task/tasks-reducer";

// export type TaskType = {
//     id: string
//     title: string
//     status:TaskStatuses
// }

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, status:TaskStatuses, todolistId: string) => void
    removeTodolist: (id: string) => void
    filter: FilterValuesType
    changeTaskTitle: (title: string, id: string, todolistId: string) => void
    ChangeTOD: (newTitle: string, todolistID: string) => void
}

export const Todolist = React.memo((props: PropsType) => {
    console.log('todolist')

const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getTaskTC(props.id))
    },[])

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)

    }, [props.addTask, props.id])

// const removeTodolist = () => props.removeTodolist(props.id)

    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id), [props.changeFilter, props.id]);
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id), [props.changeFilter, props.id]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id), [props.changeFilter, props.id]);
    const deleteTodolist = useCallback(() => props.removeTodolist(props.id), [props.removeTodolist, props.id])
    const changeTodolistTitle = useCallback((title: string) => {
        props.ChangeTOD(title, props.id)
    }, [props.id])

    let tasksForTodolist = props.tasks

    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New);
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed);
    }

    return <div>

        <h3>
            <EditableSpan title={props.title} saveTitle={changeTodolistTitle}/>

            <IconButton onClick={deleteTodolist}>
                <Delete/>
            </IconButton>
        </h3>

        <AddItemForm addItem={addTask}/>
        <div>
            {
                tasksForTodolist.map(t =>
                    <Task changeTaskTitle={props.changeTaskTitle}
                          changeTaskStatus={props.changeTaskStatus}
                          removeTask={props.removeTask}
                          tasks={t}
                          taskId={props.id}
                          key={t.id}/>
                )
            }
        </div>
        <div>
            <Button variant={props.filter === 'all' ? "contained" : "text"}
                    onClick={onAllClickHandler}
                    color="inherit"
            >All
            </Button>
            <Button variant={props.filter === 'active' ? "contained" : "text"}
                    onClick={onActiveClickHandler}
                    color="primary"
            >Active
            </Button>
            <Button variant={props.filter === 'completed' ? "contained" : "text"}
                    onClick={onCompletedClickHandler}
                    color="secondary"
            >Completed
            </Button>
        </div>
    </div>
})


