import {
    addTodolistAC,
    changeTodolistAC, changeTodolistFilterAC, FilterValuesType,
    RemoveTodolistAC, TodolistDomainType,
    todolistsReducer
} from './todolists-reducer';
import {v1} from 'uuid';
import {RequestStatusType} from "../../../app/app-reducer";
import {changeTodolistEntitiyStatusAC} from "../../../../../it-incubator-todolist-ts-16-school/src/features/TodolistsList/todolists-reducer";


let todolistId1 :string;
let todolistId2 : string;
let startState :Array<TodolistDomainType>

beforeEach(()=>{
    let todolistId1 = v1();
    let todolistId2 = v1();
     startState= [
        {id: todolistId1, title: "What to learn", filter: "all", entityStatus:'idle',addedDate: '', order: 0},
        {id: todolistId2, title: "What to buy", filter: "all",entityStatus:'idle',addedDate: '', order: 0}
    ]
})


test('correct todolist should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodolistDomainType> = [
        {id: todolistId1, title: "What to learn", filter: "all", entityStatus:'idle',addedDate: '', order: 0},
        {id: todolistId2, title: "What to buy", filter: "all",entityStatus:'idle',addedDate: '', order: 0}
    ]


    const endState = todolistsReducer(startState, RemoveTodolistAC(todolistId1))//альтернативная запись

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});


////////////////'ADD-TODOLIST'///////////////////////



test('correct todolist should be added', () => {
    // let todolistId1 = v1();
    // let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    // const startState: Array<TodolistDomainType> = [
    //     {id: todolistId1, title: "What to learn", filter: "all",entityStatus:'idle',addedDate: '', order: 0},
    //     {id: todolistId2, title: "What to buy", filter: "all",entityStatus:'idle',addedDate: '', order: 0}
    // ]

    const endState = todolistsReducer(startState,addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
    expect(endState[2].filter).toBe("all");
});

////////////////CHANGE-TODOLIST-TITL///////////////////////


test('correct todolist should change its name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodolistDomainType> = [
        {id: todolistId1, title: "What to learn", filter: "all",entityStatus:'idle',addedDate: '', order: 0},
        {id: todolistId2, title: "What to buy", filter: "all",entityStatus:'idle',addedDate: '', order: 0}
    ]

    const action = changeTodolistAC(todolistId2,newTodolistTitle)


    const endState = todolistsReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

////////////////'CHANGE-TODOLIST-FILTER'///////////////////////

test('correct filter of todolist should be changed', () => {
    // let todolistId1 = v1();
    // let todolistId2 = v1();

    let newFilter: FilterValuesType = "completed";

    // const startState: Array<TodolistDomainType> = [
    //     {id: todolistId1, title: "What to learn", filter: "all",entityStatus:'idle',addedDate: '', order: 0},
    //     {id: todolistId2, title: "What to buy", filter: "all",entityStatus:'idle',addedDate: '', order: 0}
    // ]

    const action=changeTodolistFilterAC(newFilter,todolistId2)
    const endState = todolistsReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});


test('correct entitystatus should be changed', () => {
    let todolistId3 = v1();
    let todolistId4 = v1();

    const startState2: Array<TodolistDomainType> = [
        {id: todolistId3, title: "What to learn", filter: "all",entityStatus:'idle',addedDate: '', order: 0},
        {id: todolistId4, title: "What to buy", filter: "all",entityStatus:'idle',addedDate: '', order: 0}
    ]

    let newStatus:RequestStatusType='loading'
    const action = changeTodolistEntitiyStatusAC(todolistId3,newStatus)

    const endState = todolistsReducer(startState2, action)

    expect(endState[0].entityStatus).toBe(newStatus)
    expect(endState[1].entityStatus).toBe('idle')

})



// import {
//     addTodolistAC, changeTodolistEntitiyStatusAC,
//     changeTodolistFilterAC,
//     changeTodolistTitleAC, FilterValuesType,
//     removeTodolistAC, setTodolistsAC, TodolistDomainType,
//     todolistsReducer
// } from './todolists-reducer'
// import {v1} from 'uuid'
// import {TodolistType} from '../../api/todolists-api'
// import {RequestStatusType} from "../../app/app-reducer";
//
// let todolistId1: string
// let todolistId2: string
// let startState: Array<TodolistDomainType> = []
//
// beforeEach(() => {
//     todolistId1 = v1()
//     todolistId2 = v1()
//     startState = [
//         {id: todolistId1, title: 'What to learn', filter: 'all',entityStatus:'idle', addedDate: '', order: 0},
//         {id: todolistId2, title: 'What to buy', filter: 'all',entityStatus:'idle', addedDate: '', order: 0}
//     ]
// })
//
// test('correct todolist should be removed', () => {
//     const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))
//
//     expect(endState.length).toBe(1)
//     expect(endState[0].id).toBe(todolistId2)
// })
//
// test('correct todolist should be added', () => {
//     let todolist: TodolistType = {
//         title: 'New Todolist',
//         id: 'any id',
//         addedDate: '',
//         order: 0
//     }
//
//
//     const endState = todolistsReducer(startState, addTodolistAC(todolist))
//
//     expect(endState.length).toBe(3)
//     expect(endState[0].title).toBe(todolist.title)
//     expect(endState[0].filter).toBe('all')
// })
//
// test('correct todolist should change its name', () => {
//     let newTodolistTitle = 'New Todolist'
//
//     const action = changeTodolistTitleAC(todolistId2, newTodolistTitle)
//
//     const endState = todolistsReducer(startState, action)
//
//     expect(endState[0].title).toBe('What to learn')
//     expect(endState[1].title).toBe(newTodolistTitle)
// })
//
// test('correct filter of todolist should be changed', () => {
//     let newFilter: FilterValuesType = 'completed'
//
//     const action = changeTodolistFilterAC(todolistId2, newFilter)
//
//     const endState = todolistsReducer(startState, action)
//
//     expect(endState[0].filter).toBe('all')
//     expect(endState[1].filter).toBe(newFilter)
// })
// test('todolists should be added', () => {
//
//     const action = setTodolistsAC(startState)
//
//     const endState = todolistsReducer([], action)
//
//     expect(endState.length).toBe(2)
// })
//

//
//
