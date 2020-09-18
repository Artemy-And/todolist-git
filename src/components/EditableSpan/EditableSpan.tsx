import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";


type EditableSpanType = {
    title: string
    saveTitle: (newTitle: string) => void
}


const EditableSpan = React.memo((props: EditableSpanType) => {
    console.log("Ediable span")
    let [editMode, setEditMode] = useState<boolean>(false);
    let [title, setTitle] = useState(props.title)
    const activatedEditMode = () => {
        setEditMode(true);

    }
    const disActivatedEditMode = () => {
        setEditMode(false);
        props.saveTitle(title)
        setTitle("")
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }


    return (
        editMode
            ? <TextField
                variant="outlined"
                value={title}
                onChange={changeTitle}
                autoFocus={true}
                onBlur={disActivatedEditMode}/>
            : <span onDoubleClick={activatedEditMode}>{props.title}</span>
    )
})

export default EditableSpan