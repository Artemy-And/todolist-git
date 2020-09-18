import React from 'react';
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";
import {TaskPriorities, TaskStatuses} from "../../../../api/todolists-api";


export default {
    title: 'Task Component',
    component: Task
}
///почему то не работает
// export const AddItemFormBaseExample=(props:any) => {
//     return (<AddItemForm
//         addItem={action('button clicked')}
//     />)
// }

const callBack = action('button was pressed')
const changeTaskStatus = action('status changed')
const changeTaskTitle = action('title changed')
const removeTaskTitle = action('title deleted')

export const TaskBaseExample = (props: any) => {
    return (<><Task changeTaskTitle={changeTaskTitle}
                  changeTaskStatus={changeTaskStatus}
                  removeTask={removeTaskTitle}
                  tasks={{id:'1', status:TaskStatuses.Completed, title:'CSS',
                      todoListId: "todolistId1", description: '', startDate: '',
                      deadline: "", addedDate: '', order: 0, priority: TaskPriorities.Low}}
                  taskId={'todolistId1'}
                  />
    <Task changeTaskTitle={props.changeTaskTitle}
          changeTaskStatus={props.changeTaskStatus}
          removeTask={props.removeTask}
          tasks={{id:'2', status:TaskStatuses.New, title:'JS',
              todoListId: "todolistId1", description: '', startDate: '',
              deadline: "", addedDate: '', order: 0, priority: TaskPriorities.Low}}
          taskId={props.id}/>
         </> )
}