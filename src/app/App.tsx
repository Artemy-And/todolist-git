import React from 'react';
import './App.css';

import {AppBar, Toolbar, IconButton, Typography, Button, Container} from "@material-ui/core";
import {Menu} from "@material-ui/icons"
import {TodolistsList} from "../features/TodolistsList/Todolist/TodolistsList";







// export type TasksStateType = {
//     [key: string]: Array<TaskType>
// }


const App = React.memo(() => {
    console.log('APP with REDUX')

    // const dispatch = useDispatch();
    // const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    // const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    //
    // useEffect(() => {
    //     dispatch(fetchTodoListTC())
    // }, [])
    //
    // const removeTask = useCallback((id: string, todolistId: string) => {
    //     // const action = removeTaskAC(id, todolistId)
    //     // dispatch(action)
    //     // const action = taskAPI.deleteTask(id,todolistId)
    //     // dispatch(action)
    //     dispatch(deleteTaskTC(id, todolistId))
    // }, [dispatch])
    // const addTask = useCallback((title: string, todolistId: string) => {
    //     // const action = addTaskAC(title, todolistId);
    //     // dispatch(action)
    //     dispatch(createTaskTC(title, todolistId))
    // }, [dispatch])
    // const changeStatus = useCallback((id: string, status: TaskStatuses, todolistId: string) => {
    //     const thunk = updateTaskTC(id, {status}, todolistId)
    //     dispatch(thunk)
    // }, [dispatch])
    // const changeTaskTitle = useCallback((id: string, title: string, todolistId: string) => {
    //     const action = updateTaskTC(id, {title}, todolistId)
    //     dispatch(action)
    //
    //
    // }, [dispatch])
    // const ChangeTOD = useCallback((newTitle: string, todolistID: string) => {
    //     // const action = changeTodolistAC(todolistID, newTitle)
    //     // dispatch(action)
    //     const thunk = changeTodolistTC(todolistID, newTitle)
    //     dispatch(thunk)
    // }, [dispatch])
    // const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
    //     dispatch(changeTodolistFilterAC(value, todolistId))
    // }, [dispatch])
    // const removeTodolist = useCallback((id: string) => {
    //     // let action = RemoveTodolistAC(id)
    //     // dispatch(action)
    //     dispatch(removeTodoListTC(id))
    //
    //
    // }, [dispatch])
    // const addTodoList = useCallback((title: string) => {
    //     // const action = addTodolistAC(title)
    //     // dispatch(action);
    //     dispatch(addTodoListTC(title))
    //
    //
    // }, [dispatch])
    //

    return (

        <div className="App">

            <AppBar position="static">

                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <TodolistsList />
                {/*<Grid container style={{padding: "10px"}}>*/}
                {/*    <AddItemForm addItem={addTodoList}/>*/}
                {/*</Grid>*/}
                {/*<Grid container spacing={3}>*/}
                {/*    {*/}
                {/*        todolists.map(tl => {*/}
                {/*            let allTodolistTasks = tasks[tl.id];*/}
                {/*            let tasksForTodolist = allTodolistTasks;*/}

                {/*            return <Grid item>*/}
                {/*                <Paper style={{padding: "10px"}}>*/}
                {/*                    <Todolist*/}
                {/*                        key={tl.id}*/}
                {/*                        id={tl.id}*/}
                {/*                        title={tl.title}*/}
                {/*                        tasks={tasksForTodolist}*/}
                {/*                        removeTask={removeTask}*/}
                {/*                        changeFilter={changeFilter}*/}
                {/*                        addTask={addTask}*/}
                {/*                        changeTaskStatus={changeStatus}*/}
                {/*                        filter={tl.filter}*/}
                {/*                        removeTodolist={removeTodolist}*/}
                {/*                        changeTaskTitle={changeTaskTitle}*/}
                {/*                        ChangeTOD={ChangeTOD}*/}
                {/*                    />*/}
                {/*                </Paper>*/}
                {/*            </Grid>*/}
                {/*        })*/}
                {/*    }*/}
                {/*</Grid>*/}


            </Container>


        </div>


    );
})

// type TodolistsListType = {
//     // todolists:Array<TodolistDomainType>
// }
//
// const TodolistsList:React.FC<TodolistsListType> = (props) => {
//     const dispatch = useDispatch();
//     const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
//     const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
//
//     useEffect(() => {
//         dispatch(fetchTodoListTC())
//     }, [])
//
//     const removeTask = useCallback((id: string, todolistId: string) => {
//         // const action = removeTaskAC(id, todolistId)
//         // dispatch(action)
//         // const action = taskAPI.deleteTask(id,todolistId)
//         // dispatch(action)
//         dispatch(deleteTaskTC(id, todolistId))
//     }, [dispatch])
//     const addTask = useCallback((title: string, todolistId: string) => {
//         // const action = addTaskAC(title, todolistId);
//         // dispatch(action)
//         dispatch(createTaskTC(title, todolistId))
//     }, [dispatch])
//     const changeStatus = useCallback((id: string, status: TaskStatuses, todolistId: string) => {
//         const thunk = updateTaskTC(id, {status}, todolistId)
//         dispatch(thunk)
//     }, [dispatch])
//     const changeTaskTitle = useCallback((id: string, title: string, todolistId: string) => {
//         const action = updateTaskTC(id, {title}, todolistId)
//         dispatch(action)
//
//
//     }, [dispatch])
//     const ChangeTOD = useCallback((newTitle: string, todolistID: string) => {
//         // const action = changeTodolistAC(todolistID, newTitle)
//         // dispatch(action)
//         const thunk = changeTodolistTC(todolistID, newTitle)
//         dispatch(thunk)
//     }, [dispatch])
//     const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
//         dispatch(changeTodolistFilterAC(value, todolistId))
//     }, [dispatch])
//     const removeTodolist = useCallback((id: string) => {
//         // let action = RemoveTodolistAC(id)
//         // dispatch(action)
//         dispatch(removeTodoListTC(id))
//
//
//     }, [dispatch])
//     const addTodoList = useCallback((title: string) => {
//         // const action = addTodolistAC(title)
//         // dispatch(action);
//         dispatch(addTodoListTC(title))
//
//
//     }, [dispatch])
//
//
//
//
//     return <> <Grid container style={{padding: "10px"}}>
//         <AddItemForm addItem={addTodoList}/>
//     </Grid>
//         <Grid container spacing={3}>
//             {
//                 todolists.map(tl => {
//                     let allTodolistTasks = tasks[tl.id];
//                     let tasksForTodolist = allTodolistTasks;
//
//                     return <Grid item>
//                         <Paper style={{padding: "10px"}}>
//                             <Todolist
//                                 key={tl.id}
//                                 id={tl.id}
//                                 title={tl.title}
//                                 tasks={tasksForTodolist}
//                                 removeTask={removeTask}
//                                 changeFilter={changeFilter}
//                                 addTask={addTask}
//                                 changeTaskStatus={changeStatus}
//                                 filter={tl.filter}
//                                 removeTodolist={removeTodolist}
//                                 changeTaskTitle={changeTaskTitle}
//                                 ChangeTOD={ChangeTOD}
//                             />
//                         </Paper>
//                     </Grid>
//                 })
//             }
//         </Grid></>
// }

export default App;

