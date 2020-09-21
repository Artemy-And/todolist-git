import React, {useCallback, useEffect} from 'react';
import AddItemForm from "./../../../components/AddItemForm/AddItemForm";
import EditableSpan from "./../../../components/EditableSpan/EditableSpan"
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from './Task/Task';
import {TaskStatuses, TaskType} from "./../../../api/todolists-api";
import {FilterValuesType, TodolistDomainType} from "./todolists-reducer";
import {useDispatch} from "react-redux";
import {getTaskTC} from "./Task/tasks-reducer";

// export type TaskType = {
//     id: string
//     title: string
//     status:TaskStatuses
// }

type PropsType = {
    todolist:TodolistDomainType
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, status:TaskStatuses, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTaskTitle: (title: string, id: string, todolistId: string) => void
    ChangeTOD: (newTitle: string, todolistID: string) => void,
    demo?:boolean
}

export const Todolist = React.memo(({demo=false,...props}:PropsType) => {//такая запись DEMO
    console.log('todolist')
   // if (typeof props.demo === 'undefined') props.demo = false // такая запись

const dispatch = useDispatch()

    useEffect(()=>{
        if (demo){return
        }
        dispatch(getTaskTC(props.todolist.id))
    },[])

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todolist.id)

    }, [props.addTask, props.todolist.id])

// const removeTodolist = () => props.removeTodolist(props.id)

    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.todolist.id), [props.changeFilter, props.todolist.id]);
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.todolist.id), [props.changeFilter, props.todolist.id]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.todolist.id), [props.changeFilter, props.todolist.id]);
    const deleteTodolist = useCallback(() => props.removeTodolist(props.todolist.id), [props.removeTodolist, props.todolist.id])
    const changeTodolistTitle = useCallback((title: string) => {
        props.ChangeTOD(title, props.todolist.id)
    }, [props.todolist.id])

    let tasksForTodolist = props.tasks

    if (props.todolist.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New);
    }
    if (props.todolist.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed);
    }

    return <div>

        <h3>
            <EditableSpan title={props.todolist.title} saveTitle={changeTodolistTitle}/>

            <IconButton onClick={deleteTodolist} disabled={props.todolist.entityStatus === 'loading'}>
                <Delete/>
            </IconButton>
        </h3>

        <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === 'loading'}/>
        <div>
            {
                tasksForTodolist.map(t =>
                    <Task changeTaskTitle={props.changeTaskTitle}
                          changeTaskStatus={props.changeTaskStatus}
                          removeTask={props.removeTask}
                          tasks={t}
                          taskId={props.todolist.id}
                          key={t.id}/>
                )
            }
        </div>
        <div>
            <Button variant={props.todolist.filter === 'all' ? "contained" : "text"}
                    onClick={onAllClickHandler}
                    color="inherit"
            >All
            </Button>
            <Button variant={props.todolist.filter === 'active' ? "contained" : "text"}
                    onClick={onActiveClickHandler}
                    color="primary"
            >Active
            </Button>
            <Button variant={props.todolist.filter === 'completed' ? "contained" : "text"}
                    onClick={onCompletedClickHandler}
                    color="secondary"
            >Completed
            </Button>
        </div>
    </div>
})


