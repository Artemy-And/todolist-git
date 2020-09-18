import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    RemoveTodolistAC,
    tasksReducer
} from './tasks-reducer';
import {TasksStateType} from '../../../../trash/App';
import {v1} from "uuid";
import {addTodolistAC} from '../todolists-reducer';
import {TaskPriorities, TaskStatuses} from "../../../../api/todolists-api";

test('correct task should be deleted from correct array', () => {
    const startState: TasksStateType = {

        "todolistId1": [
            { id: "1", title: "CSS",status:TaskStatuses.New,
                todoListId: "todolistId1", description: '', startDate: '',
                deadline: "", addedDate: '', order: 0, priority: TaskPriorities.Low},
            { id: "2", title: "JS",status:TaskStatuses.Completed,
                todoListId: "todolistId1", description: '', startDate: '',
                deadline: "", addedDate: '', order: 0, priority: TaskPriorities.Low},
            { id: "3", title: "React",status:TaskStatuses.New,
                todoListId: "todolistId1", description: '', startDate: '',
                deadline: "", addedDate: '', order: 0, priority: TaskPriorities.Low}
        ],
        "todolistId2": [
            { id: "1", title: "bread",status:TaskStatuses.New,
                todoListId: "todolistId2", description: '', startDate: '',
                deadline: "", addedDate: '', order: 0, priority: TaskPriorities.Low },
            { id: "2", title: "milk", status:TaskStatuses.New,
                todoListId: "todolistId2", description: '', startDate: '',
                deadline: "", addedDate: '', order: 0, priority: TaskPriorities.Low},
            { id: "3", title: "tea", status:TaskStatuses.Completed,
                todoListId: "todolistId2", description: '', startDate: '',
                deadline: "", addedDate: '', order: 0, priority: TaskPriorities.Low}
        ]
    };

    const action = removeTaskAC("2", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(2);
    expect(endState["todolistId2"].every(t => t.id != "2")).toBeTruthy();
    // expect(endState['todolist2'][1].id).toBe("3")
});




test('correct task should be added to correct array', () => {
    const startState: TasksStateType = {

        "todolistId1": [
            { id: "1", title: "CSS",status:TaskStatuses.New,
                todoListId: "todolistId1", description: '', startDate: '',
                deadline: "", addedDate: '', order: 0, priority: TaskPriorities.Low},
            { id: "2", title: "JS",status:TaskStatuses.Completed,
                todoListId: "todolistId1", description: '', startDate: '',
                deadline: "", addedDate: '', order: 0, priority: TaskPriorities.Low},
            { id: "3", title: "React",status:TaskStatuses.New,
                todoListId: "todolistId1", description: '', startDate: '',
                deadline: "", addedDate: '', order: 0, priority: TaskPriorities.Low}
        ],
        "todolistId2": [
            { id: "1", title: "bread",status:TaskStatuses.New,
                todoListId: "todolistId2", description: '', startDate: '',
                deadline: "", addedDate: '', order: 0, priority: TaskPriorities.Low },
            { id: "2", title: "milk", status:TaskStatuses.New,
                todoListId: "todolistId2", description: '', startDate: '',
                deadline: "", addedDate: '', order: 0, priority: TaskPriorities.Low},
            { id: "3", title: "tea", status:TaskStatuses.Completed,
                todoListId: "todolistId2", description: '', startDate: '',
                deadline: "", addedDate: '', order: 0, priority: TaskPriorities.Low}
        ]
    };

    const action = addTaskAC("juce", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juce");
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
})


test('status of specified task should be changed', () => {
    const startState: TasksStateType = {

        "todolistId1": [
            { id: "1", title: "CSS",status:TaskStatuses.New,
                todoListId: "todolistId1", description: '', startDate: '',
                deadline: "", addedDate: '', order: 0, priority: TaskPriorities.Low},
            { id: "2", title: "JS",status:TaskStatuses.Completed,
                todoListId: "todolistId1", description: '', startDate: '',
                deadline: "", addedDate: '', order: 0, priority: TaskPriorities.Low},
            { id: "3", title: "React",status:TaskStatuses.New,
                todoListId: "todolistId1", description: '', startDate: '',
                deadline: "", addedDate: '', order: 0, priority: TaskPriorities.Low}
        ],
        "todolistId2": [
            { id: "1", title: "bread",status:TaskStatuses.New,
                todoListId: "todolistId2", description: '', startDate: '',
                deadline: "", addedDate: '', order: 0, priority: TaskPriorities.Low },
            { id: "2", title: "milk", status:TaskStatuses.New,
                todoListId: "todolistId2", description: '', startDate: '',
                deadline: "", addedDate: '', order: 0, priority: TaskPriorities.Low},
            { id: "3", title: "tea", status:TaskStatuses.Completed,
                todoListId: "todolistId2", description: '', startDate: '',
                deadline: "", addedDate: '', order: 0, priority: TaskPriorities.Low}
        ]
    };

    const action = changeTaskStatusAC("2", TaskStatuses.New, "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New);
    expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed);

});


test('title should be changed', () => {
    const startState: TasksStateType = {

        "todolistId1": [
            { id: "1", title: "CSS",status:TaskStatuses.New,
                todoListId: "todolistId1", description: '', startDate: '',
                deadline: "", addedDate: '', order: 0, priority: TaskPriorities.Low},
            { id: "2", title: "JS",status:TaskStatuses.Completed,
                todoListId: "todolistId1", description: '', startDate: '',
                deadline: "", addedDate: '', order: 0, priority: TaskPriorities.Low},
            { id: "3", title: "React",status:TaskStatuses.New,
                todoListId: "todolistId1", description: '', startDate: '',
                deadline: "", addedDate: '', order: 0, priority: TaskPriorities.Low}
        ],
        "todolistId2": [
            { id: "1", title: "bread",status:TaskStatuses.New,
                todoListId: "todolistId2", description: '', startDate: '',
                deadline: "", addedDate: '', order: 0, priority: TaskPriorities.Low },
            { id: "2", title: "milk", status:TaskStatuses.New,
                todoListId: "todolistId2", description: '', startDate: '',
                deadline: "", addedDate: '', order: 0, priority: TaskPriorities.Low},
            { id: "3", title: "tea", status:TaskStatuses.Completed,
                todoListId: "todolistId2", description: '', startDate: '',
                deadline: "", addedDate: '', order: 0, priority: TaskPriorities.Low}
        ]
    };

    const action = changeTaskTitleAC("2", "milk goat", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].title).toBe("milk goat");
    expect(endState["todolistId1"][1].title).toBe("JS");

});




test('new array should be added when new todolist is added', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            { id: "1", title: "CSS",status:TaskStatuses.New,
                todoListId: "todolistId1", description: '', startDate: '',
                deadline: "", addedDate: '', order: 0, priority: TaskPriorities.Low},
            { id: "2", title: "JS",status:TaskStatuses.Completed,
                todoListId: "todolistId1", description: '', startDate: '',
                deadline: "", addedDate: '', order: 0, priority: TaskPriorities.Low},
            { id: "3", title: "React",status:TaskStatuses.New,
                todoListId: "todolistId1", description: '', startDate: '',
                deadline: "", addedDate: '', order: 0, priority: TaskPriorities.Low}
        ],
        "todolistId2": [
            { id: "1", title: "bread",status:TaskStatuses.New,
                todoListId: "todolistId2", description: '', startDate: '',
                deadline: "", addedDate: '', order: 0, priority: TaskPriorities.Low },
            { id: "2", title: "milk", status:TaskStatuses.New,
                todoListId: "todolistId2", description: '', startDate: '',
                deadline: "", addedDate: '', order: 0, priority: TaskPriorities.Low},
            { id: "3", title: "tea", status:TaskStatuses.Completed,
                todoListId: "todolistId2", description: '', startDate: '',
                deadline: "", addedDate: '', order: 0, priority: TaskPriorities.Low}
        ]
    };

    // const action = AddTodolistAC("todolist3");
    const action = addTodolistAC("blabla");

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
    const startState: TasksStateType = {

        "todolistId1": [
            { id: "1", title: "CSS",status:TaskStatuses.New,
                todoListId: "todolistId1", description: '', startDate: '',
                deadline: "", addedDate: '', order: 0, priority: TaskPriorities.Low},
            { id: "2", title: "JS",status:TaskStatuses.Completed,
                todoListId: "todolistId1", description: '', startDate: '',
                deadline: "", addedDate: '', order: 0, priority: TaskPriorities.Low},
            { id: "3", title: "React",status:TaskStatuses.New,
                todoListId: "todolistId1", description: '', startDate: '',
                deadline: "", addedDate: '', order: 0, priority: TaskPriorities.Low}
        ],
        "todolistId2": [
            { id: "1", title: "bread",status:TaskStatuses.New,
                todoListId: "todolistId2", description: '', startDate: '',
                deadline: "", addedDate: '', order: 0, priority: TaskPriorities.Low },
            { id: "2", title: "milk", status:TaskStatuses.New,
                todoListId: "todolistId2", description: '', startDate: '',
                deadline: "", addedDate: '', order: 0, priority: TaskPriorities.Low},
            { id: "3", title: "tea", status:TaskStatuses.Completed,
                todoListId: "todolistId2", description: '', startDate: '',
                deadline: "", addedDate: '', order: 0, priority: TaskPriorities.Low}
        ]
    };

    const action = RemoveTodolistAC("todolistId2");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});



test('correct todolist should be added to correct array', () => {
    let todolistId1=v1();
    let todolistId2 =v1()

    const startState: TasksStateType = {

        "todolistId1": [
            { id: "1", title: "CSS",status:TaskStatuses.New,
                todoListId: "todolistId1", description: '', startDate: '',
                deadline: "", addedDate: '', order: 0, priority: TaskPriorities.Low},
            { id: "2", title: "JS",status:TaskStatuses.Completed,
                todoListId: "todolistId1", description: '', startDate: '',
                deadline: "", addedDate: '', order: 0, priority: TaskPriorities.Low},
            { id: "3", title: "React",status:TaskStatuses.New,
                todoListId: "todolistId1", description: '', startDate: '',
                deadline: "", addedDate: '', order: 0, priority: TaskPriorities.Low}
        ],
        "todolistId2": [
            { id: "1", title: "bread",status:TaskStatuses.New,
                todoListId: "todolistId2", description: '', startDate: '',
                deadline: "", addedDate: '', order: 0, priority: TaskPriorities.Low },
            { id: "2", title: "milk", status:TaskStatuses.New,
                todoListId: "todolistId2", description: '', startDate: '',
                deadline: "", addedDate: '', order: 0, priority: TaskPriorities.Low},
            { id: "3", title: "tea", status:TaskStatuses.Completed,
                todoListId: "todolistId2", description: '', startDate: '',
                deadline: "", addedDate: '', order: 0, priority: TaskPriorities.Low}
        ]
    };

    const action = addTaskAC("juce", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juce");
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
})



