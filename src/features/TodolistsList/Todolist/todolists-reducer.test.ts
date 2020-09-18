import {
    addTodolistAC,
    changeTodolistAC, changeTodolistFilterAC, FilterValuesType,
    RemoveTodolistAC, TodolistDomainType,
    todolistsReducer
} from './todolists-reducer';
import {v1} from 'uuid';



test('correct todolist should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodolistDomainType> = [
        {id: todolistId1, title: "What to learn", filter: "all",addedDate: '', order: 0},
        {id: todolistId2, title: "What to buy", filter: "all",addedDate: '', order: 0}
    ]


    const endState = todolistsReducer(startState, RemoveTodolistAC(todolistId1))//альтернативная запись

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});


////////////////'ADD-TODOLIST'///////////////////////



test('correct todolist should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodolistDomainType> = [
        {id: todolistId1, title: "What to learn", filter: "all",addedDate: '', order: 0},
        {id: todolistId2, title: "What to buy", filter: "all",addedDate: '', order: 0}
    ]

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
        {id: todolistId1, title: "What to learn", filter: "all",addedDate: '', order: 0},
        {id: todolistId2, title: "What to buy", filter: "all",addedDate: '', order: 0}
    ]

    const action = changeTodolistAC(todolistId2,newTodolistTitle)


    const endState = todolistsReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

////////////////'CHANGE-TODOLIST-FILTER'///////////////////////

test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFilter: FilterValuesType = "completed";

    const startState: Array<TodolistDomainType> = [
        {id: todolistId1, title: "What to learn", filter: "all",addedDate: '', order: 0},
        {id: todolistId2, title: "What to buy", filter: "all",addedDate: '', order: 0}
    ]

    const action=changeTodolistFilterAC(newFilter,todolistId2)
    const endState = todolistsReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});



