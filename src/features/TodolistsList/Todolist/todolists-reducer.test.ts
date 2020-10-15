import {
    addTodolistAC, changeTodilistEntitiyStatusAC,
    changeTodolistFilterAC, changeTodolistTitleAC, FilterValuesType, removeTodolistAC,
    TodolistDomainType,
    todolistsReducer
} from './todolists-reducer';
import {v1} from 'uuid';
import {RequestStatusType} from "../../../app/app-reducer";


let todolistId1: string
let todolistId2: string
let startState: Array<TodolistDomainType> = []

beforeEach(() => {
    let todolistId1 = v1();
    let todolistId2 = v1();
    startState = [
        {id: todolistId1, title: "What to learn", filter: "all", entityStatus: 'idle', addedDate: '', order: 0},
        {id: todolistId2, title: "What to buy", filter: "all", entityStatus: 'idle', addedDate: '', order: 0}
    ]
})

test('correct todolist should be removed', () => {

    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodolistDomainType> = [
        {id: todolistId1, title: "What to learn", filter: "all", entityStatus: 'idle', addedDate: '', order: 0},
        {id: todolistId2, title: "What to buy", filter: "all", entityStatus: 'idle', addedDate: '', order: 0}
    ]
    const endState = todolistsReducer(startState, removeTodolistAC({id: todolistId1}))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

////////////////'ADD-TODOLIST'///////////////////////


test('correct todolist should be added', () => {
    // let todolistId1 = v1();
    // let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const endState = todolistsReducer(startState, addTodolistAC({
        todolist: {
            id: 'any',
            title: 'New Todolist',
            addedDate: '',
            order: 0
        }
    }))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
    expect(endState[0].filter).toBe("all");
});

////////////////CHANGE-TODOLIST-TITL///////////////////////

test('correct todolist should change its name', () => {
    let newTodolistTitle = 'New Todolist'
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodolistDomainType> = [
        {id: todolistId1, title: "What to learn", filter: "all", entityStatus: 'idle', addedDate: '', order: 0},
        {id: todolistId2, title: "What to buy", filter: "all", entityStatus: 'idle', addedDate: '', order: 0}
    ]

    const action = changeTodolistTitleAC({id: todolistId2, title: newTodolistTitle})

    const endState = todolistsReducer(startState, action)

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

////////////////'CHANGE-TODOLIST-FILTER'///////////////////////

test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFilter: FilterValuesType = "completed";

    const startState: Array<TodolistDomainType> = [
        {id: todolistId1, title: "What to learn", filter: "all", entityStatus: 'idle', addedDate: '', order: 0},
        {id: todolistId2, title: "What to buy", filter: "all", entityStatus: 'idle', addedDate: '', order: 0}
    ]

    const action = changeTodolistFilterAC({filter: newFilter, id: todolistId2})
    const endState = todolistsReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});
test('correct entitystatus should be changed', () => {
    let todolistId3 = v1();
    let todolistId4 = v1();

    const startState2: Array<TodolistDomainType> = [
        {id: todolistId3, title: "What to learn", filter: "all", entityStatus: 'idle', addedDate: '', order: 0},
        {id: todolistId4, title: "What to buy", filter: "all", entityStatus: 'idle', addedDate: '', order: 0}
    ]

    let newStatus: RequestStatusType = 'loading'
    const action = changeTodilistEntitiyStatusAC({id: todolistId3, entityStatus: newStatus})

    const endState = todolistsReducer(startState2, action)

    expect(endState[0].entityStatus).toBe(newStatus)
    expect(endState[1].entityStatus).toBe('idle')

})
