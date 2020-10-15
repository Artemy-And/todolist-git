import {
    addTaskAC,
    removeTaskAC, setTaskAC,
    tasksReducer, TasksStateType, UpdateDomainTaskModelType, updateTaskAC
} from './tasks-reducer';

import {addTodolistAC, setTodilistAC} from '../todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, TodolistType} from "../../../../api/todolists-api";
import {
    removeTodolistAC,
} from './../todolists-reducer'

let startState: TasksStateType = {}
beforeEach(() => {
    startState = {
        "todolistId1": [
            {
                id: "1", title: "CSS", status: TaskStatuses.New,
                todoListId: "todolistId1", description: '', startDate: '',
                deadline: "", addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: "2", title: "JS", status: TaskStatuses.Completed,
                todoListId: "todolistId1", description: '', startDate: '',
                deadline: "", addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: "3", title: "React", status: TaskStatuses.New,
                todoListId: "todolistId1", description: '', startDate: '',
                deadline: "", addedDate: '', order: 0, priority: TaskPriorities.Low
            }
        ],
        "todolistId2": [
            {
                id: "1", title: "bread", status: TaskStatuses.New,
                todoListId: "todolistId2", description: '', startDate: '',
                deadline: "", addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: "2", title: "milk", status: TaskStatuses.New,
                todoListId: "todolistId2", description: '', startDate: '',
                deadline: "", addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: "3", title: "tea", status: TaskStatuses.Completed,
                todoListId: "todolistId2", description: '', startDate: '',
                deadline: "", addedDate: '', order: 0, priority: TaskPriorities.Low
            }
        ]
    }
})


test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC({taskId: "2", todolistId: "todolistId2"});

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(2);
    expect(endState["todolistId2"].every(t => t.id != "2")).toBeTruthy();
    // expect(endState['todolist2'][1].id).toBe("3")
});
test('correct task should be added to correct array', () => {
    let task = {
        description: "",
        title: "juce",
        status: TaskStatuses.New,
        priority: 0,
        startDate: '',
        deadline: '',
        id: 'there is ID',
        todoListId: "todolistId2",
        order: 0,
        addedDate: ''
    }

    const action = addTaskAC({
        task: task,
        // todolistId: 'todolistId2'

    });
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juce");
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
})
test('status of specified task should be changed', () => {

    const action = updateTaskAC({taskId: "2", model: {status: TaskStatuses.New}, todolistId: "todolistId2"});

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New);
    expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed);

});
test('new array should be added when new todolist is added', () => {
    const action = addTodolistAC({
        todolist: {
            id: 'bla bla',
            title: 'new todolist',
            addedDate: '',
            order: 0,
        }

    });

    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);//это сравнение
});
test('property with todolistId should be deleted', () => {
    const action = removeTodolistAC({id: "todolistId2"});
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState);
    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});
test('empty array should be added whet set todolists', () => {
    const action = setTodilistAC({
        todoList: [
            {id: '1', title: 'title1', addedDate: '', order: 0,},
            {id: '2', title: 'title2', addedDate: '', order: 0,}
        ]
    });
    const endState = tasksReducer({}, action)
    const keys = Object.keys(endState)
    expect(keys.length).toBe(2);
    expect(endState['1']).toBeDefined()
    expect(endState['2']).toBeDefined()

});
test('correct todolist should be added to correct array', () => {
    const action = setTaskAC({tasks: startState['todolistId1'], todoListId: 'todolistId1'});
    const endState = tasksReducer({
        'todolistId2': [],
        'todolistId1': []
    }, action)
    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(0);

})






