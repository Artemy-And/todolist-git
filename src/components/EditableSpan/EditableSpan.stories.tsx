import React from 'react';


import {action} from "@storybook/addon-actions";
import {Task} from "../../features/TodolistsList/Todolist/Task/Task";
import EditableSpan from "./EditableSpan";



export default {
    title: 'EditableSpan Component',
    component: EditableSpan
}
///почему то не работает
// export const AddItemFormBaseExample=(props:any) => {
//     return (<AddItemForm
//         addItem={action('button clicked')}
//     />)
// }

const saveTitle = action('saveTitle')


export const TaskBaseExample = (props: any) => {
    return (<EditableSpan saveTitle={saveTitle} title={'start value'}/>)
}