import React from 'react';

import AddItemForm from "./AddItemForm";
import {action} from "@storybook/addon-actions";



export default {
    title: 'addItemForm Component',
    component: AddItemForm
}
///почему то не работает
// export const AddItemFormBaseExample=(props:any) => {
//     return (<AddItemForm
//         addItem={action('button clicked')}
//     />)
// }

const callBack = action('button was pressed')

export const AddItemFormBaseExample = (props: any) => {
    return (<AddItemForm
        addItem={callBack}
    />)
}