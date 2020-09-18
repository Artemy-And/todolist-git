import React, {useEffect, useState} from 'react'
import {todolistAPI, taskAPI} from '../api/todolists-api'

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolist()
            .then((res) => {

                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<any>('')

    const todolistAPION = () => {
        todolistAPI.createTodolist(title)
            .then((res) => {

                setState(res.data)
            })
    }
    return <div>
        {JSON.stringify(state)}
        <input placeholder={'title'} value={title} onChange={(event) => {
            setTitle(event.currentTarget.value)
        }}></input>
        <button onClick={() => {
            todolistAPION()
        }}>add
        </button>

    </div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>('')

    const todolistAPION = () => {
        todolistAPI.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div> {JSON.stringify(state)}
        <input placeholder={'todolistId'} value={todolistId} onChange={(event) => {
            setTodolistId(event.currentTarget.value)
        }}></input>
        <button onClick={() => {
            todolistAPION()
        }}>Click
        </button>
    </div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const todolistAPION = () => {
        todolistAPI.updateTodolist(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>
        <input placeholder={'todolistId'} value={todolistId} onChange={(event) => {
            setTodolistId(event.currentTarget.value)
        }}></input>
        <input placeholder={'title'} value={title} onChange={(event) => {
            setTitle(event.currentTarget.value)
        }}></input>

        <button onClick={() => {
            todolistAPION()
        }}>Click
        </button>
        {JSON.stringify(state)}
    </div>
}


export const GetTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')

const todolistAPION = ()=>{
    taskAPI.getTask(todolistId)
        .then((res) => {

            setState(res.data)
        })
    }
    return <div>
        {JSON.stringify(state)}
        <input placeholder={'todolistId'} value={todolistId} onChange={(event) => {
            setTodolistId(event.currentTarget.value)
        }}></input>
        <button onClick={() => {
            todolistAPION()
        }}>Click
        </button>
    </div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const todolistAPION = ()=>{
        taskAPI.createTask(todolistId, title)
            .then((res) => {
debugger
                setState(res.data)
            })}

    return <div>
        {JSON.stringify(state)}
        <input placeholder={'todolistId'} value={todolistId} onChange={(event) => {
            setTodolistId(event.currentTarget.value)
        }}></input>
        <input placeholder={'title'} value={title} onChange={(event) => {
            setTitle(event.currentTarget.value)
        }}></input>

        <button onClick={() => {
            todolistAPION()
        }}>Click
        </button>
    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    // const todolistId = '70d1a778-2eec-4db9-b1a6-1f52df75178e'
    //
    // const taskId = "8393443c-fecf-412c-9793-a950b2e65dfb"

  const todolistAPION=()=>{
      taskAPI.deleteTask(todolistId, taskId)
          .then((res) => {

              setState(res.data)
          })
          .catch((error) => {

              console.log(error)
          })
  }

    // 504ab2cb-8aca-46cb-ae10-cd875631782f
    // 1ee3dc52-334d-4e65-bd7a-0eb26abc81b9

    return <div>
        {JSON.stringify(state)}
        <input placeholder={'todolistId'} value={todolistId} onChange={(event) => {
            setTodolistId(event.currentTarget.value)
        }}></input>
        <input placeholder={'taskId'} value={taskId} onChange={(event) => {
            setTaskId(event.currentTarget.value)
        }}></input>
        <button onClick={() => {
            todolistAPION()
        }}>Click
        </button>
    </div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const [title, setTitle] = useState<string>('')



const todolistAPION=()=>{
    // taskAPI.updateTask(todolistId, taskId, title)
    // .then((res)=>{
    //     setState(res.data)
    // })
}



    return <div>
        {JSON.stringify(state)}
        <input placeholder={'todolistId'} value={todolistId} onChange={(event) => {
            setTodolistId(event.currentTarget.value)
        }}></input>
        <input placeholder={'taskId'} value={taskId} onChange={(event) => {
            setTaskId(event.currentTarget.value)
        }}></input>
        <input placeholder={'title'} value={title} onChange={(event) => {
            setTitle(event.currentTarget.value)
        }}></input>
        <button onClick={() => {
            // todolistAPION()
        }}>Click
        </button>
    </div>
}


    // {"id":"58afb614-70f8-4d5d-b04e-619b79193367","title":"bla bla bla","description":null,
    //     "todoListId":"1f1bc4af-7c9f-4c36-abe5-0317a9d309f2","order":-1,"status":0,"priority":1,"startDate":null,
    // "deadline":null,"addedDate":"2020-08-21T15:09:19.277"}],"totalCount":2,"error":null}
