import React from "react";
import {Provider} from "react-redux";
import {AppRootStateType, store} from "../../app/store";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {tasksReducer} from "../../features/TodolistsList/Todolist/Task/tasks-reducer";
import {todolistsReducer} from "../../features/TodolistsList/Todolist/todolists-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../../api/todolists-api";
import {appReducer} from "../../app/app-reducer";
import thunk from "redux-thunk";
import {authReducer} from "../../features/Login/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";
import {HashRouter} from "react-router-dom";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth:authReducer
})

const initialGlobalState = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all",entityStatus:'idle', addedDate: '', order: 0},
        {id: "todolistId2", title: "What to buy",entityStatus:'loading', filter: "all", addedDate: '', order: 0}
    ],
    tasks: {
        ["todolistId1"]: [
            {
                id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed,
                todoListId: "todolistId1", description: '', startDate: '',
                deadline: "", addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: v1(), title: "JS", status: TaskStatuses.Completed,
                todoListId: "todolistId1", description: '', startDate: '',
                deadline: "", addedDate: '', order: 0, priority: TaskPriorities.Low
            }
        ],
        ["todolistId2"]: [
            {
                id: v1(), title: "Milk", status: TaskStatuses.Completed,
                todoListId: "todolistId2", description: '', startDate: '',
                deadline: "", addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: v1(), title: "React Book", status: TaskStatuses.Completed,
                todoListId: "todolistId2", description: '', startDate: '',
                deadline: "", addedDate: '', order: 0, priority: TaskPriorities.Low
            }
        ]
    },
    app: {
        status: 'succeeded',//succed
        error: null,
        isInitialized:true//true
    },
    auth:{
        isLoggedIn: true//true
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType,applyMiddleware(thunk));
// export const storyBookStore = configureStore({
//     reducer:rootReducer,
//     preloadedState:initialGlobalState,
//     middleware:getDefaultMiddleware => getDefaultMiddleware().prepend(thunk)
// })

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)

export const BrowserRouterDecorator = (storyFn: any) => (
    <HashRouter>{storyFn()}
    </HashRouter>)