import React, {useCallback, useEffect} from 'react';
import './App.css';

import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
    Container,
    LinearProgress,
    CircularProgress
} from "@material-ui/core";
import {Menu} from "@material-ui/icons"
import {TodolistsList} from "../features/TodolistsList/Todolist/TodolistsList";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {RequestStatusType} from "./app-reducer";

import {ErrorSnackbar} from "../components/errorSnackBar/ErrorSnackbar";
import {BrowserRouter, Route} from "react-router-dom";
import {Login} from "../features/Login/Login";
import {initializedAppTC, logoutTC} from "../features/Login/auth-reducer";


// export type TasksStateType = {
//     [key: string]: Array<TaskType>
// }
type PropsType = {
    demo?: boolean
}

const App = React.memo(({demo = false}: PropsType) => {
    console.log('APP with REDUX')
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializedAppTC())
    },[])
    const logoHandler=useCallback(()=>{
        dispatch(logoutTC())
    },[])
    // if (!isInitialized) { Колесо загрузки, на гите оно постоянно крутится
    //     return <div
    //         style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
    //         <CircularProgress/>
    //     </div>
    // }

    return (
        <BrowserRouter>
            <div className="App">
                <ErrorSnackbar/>
                <AppBar position="static">

                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6">
                            News
                        </Typography>
                        {isLoggedIn && <Button color="inherit" onClick={logoHandler}>Log out</Button>}

                    </Toolbar>
                    {status === 'loading' && <LinearProgress/>}

                </AppBar>

                <Container fixed>
                    <Route exact path={'/'} render={() => <TodolistsList demo={demo}/>}/>
                    <Route path={'/login'} render={() => <Login/>}/>


                </Container>


            </div>
        </BrowserRouter>


    );
})

export default App;

