import React, {useState} from 'react';
import '../app/App.css';
import {Todolist} from '../features/TodolistsList/Todolist/TodoList';
import {v1} from 'uuid';
import AddItemForm from "../components/AddItemForm/AddItemForm";
import {AppBar, Toolbar, IconButton, Typography, Button, Container, Grid} from "@material-ui/core";
import {Menu} from "@material-ui/icons"
import Paper from "@material-ui/core/Paper";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolists-api";
import {FilterValuesType, TodolistDomainType} from "../features/TodolistsList/Todolist/todolists-reducer";




export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistDomainType>>([
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: '', order: 0},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate: '', order: 0}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {
                id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed,
                todoListId: todolistId1, description: '', startDate: '',
                deadline: "", addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: v1(), title: "JS", status: TaskStatuses.Completed,
                todoListId: todolistId1, description: '', startDate: '',
                deadline: "", addedDate: '', order: 0, priority: TaskPriorities.Low
            }
        ],
        [todolistId2]: [

            {
                id: v1(), title: "Milk", status: TaskStatuses.Completed,
                todoListId: todolistId2, description: '', startDate: '',
                deadline: "", addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: v1(), title: "React Book", status: TaskStatuses.Completed,
                todoListId: todolistId2, description: '', startDate: '',
                deadline: "", addedDate: '', order: 0, priority: TaskPriorities.Low
            }
        ]
    });

    function ChangeTOD(newTitle: string, todolistID: string) {
        let todolistTasks = todolists.find(tl => tl.id === todolistID)
        if (todolistTasks) {
            todolistTasks.title = newTitle;
            setTodolists([...todolists])
        }
    }


    function removeTask(id: string, todolistId: string) {
        //достанем нужный массив по todolistId:
        let todolistTasks = tasks[todolistId];
        // перезапишем в этом объекте массив для нужного тудулиста отфилтрованным массивом:
        tasks[todolistId] = todolistTasks.filter(t => t.id != id);
        // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        setTasks({...tasks});
    }

    function addTask(title: string, todolistId: string) {
        let task = {
            id: v1(), title: title, status: TaskStatuses.New,
            todoListId: todolistId1, description: '', startDate: '',
            deadline: "", addedDate: '', order: 0, priority: TaskPriorities.Low
        };
        //достанем нужный массив по todolistId:
        let todolistTasks = tasks[todolistId];
        // перезапишем в этом объекте массив для нужного тудулиста копией, добавив в начало новую таску:
        tasks[todolistId] = [task, ...todolistTasks];
        // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        setTasks({...tasks});
    }

    function changeStatus(id: string, status: TaskStatuses, todolistId: string) {
        //достанем нужный массив по todolistId:
        let todolistTasks = tasks[todolistId];
        // найдём нужную таску:
        let task = todolistTasks.find(t => t.id === id);
        //изменим таску, если она нашлась
        if (task) {
            task.status = status;
            // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
            setTasks({...tasks});
        }
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists])
        }
    }

    function removeTodolist(id: string) {
        // засунем в стейт список тудулистов, id которых не равны тому, который нужно выкинуть
        setTodolists(todolists.filter(tl => tl.id != id));
        // удалим таски для этого тудулиста из второго стейта, где мы храним отдельно таски
        delete tasks[id]; // удаляем св-во из объекта... значением которого являлся массив тасок
        // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        setTasks({...tasks});
    }

    function addTodoList(title: string) {
        let newTodoListId = v1();
        let newTodolist: TodolistDomainType = {
            id: newTodoListId, title: title, filter: "all", addedDate: "",
            order: 0
        }
        setTodolists([newTodolist, ...todolists]);
        setTasks({
            ...tasks,
            [newTodoListId]: []
        })

    }

    function changeTaskTitle(id: string, title: string, todolistId: string) {
        let todolistTasks = tasks[todolistId];
        let task = todolistTasks.find(t => t.id === id);
        if (task) {
            task.title = title;
        }
        setTasks({...tasks})

    }

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
                <Grid container style={{padding: "10px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks;

                            if (tl.filter === "active") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.status === TaskStatuses.New);
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.status === TaskStatuses.Completed);
                            }
                            return <Grid item>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        ChangeTOD={ChangeTOD}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>


            </Container>


        </div>


    );
}


export default App;
