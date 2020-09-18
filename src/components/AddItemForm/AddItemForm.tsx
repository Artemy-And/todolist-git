import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from "react";
import {Button, IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";


type AddItemFormType = {
    addItem: (title: string) => void
}

const AddItemForm = React.memo((props: AddItemFormType)=>{
    console.log('add item form')
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)


    const addItem = () => {

        if (title.trim() !== "") {
            props.addItem(title);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }


    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    },[])
    const onKeyPressHandler = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null){
            setError(null);
        }

        if (e.charCode === 13) {
            addItem();
        }
    },[])

    return (


        <div>
            <TextField
                variant="outlined"
                value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   error={!!error}
                label="Title"
                helperText={error}
            />
            {/*<Button*/}
            {/*    variant="contained"*/}
            {/*    color="primary"*/}
            {/*    onClick={addItem}*/}
            {/*>+</Button>*/}


            <IconButton color="primary"
                        onClick={addItem}>
                <AddBox />!
            </IconButton>
            {/*{error && <div className="error-message">{error}</div>}*/}
        </div>
    )
})


export default AddItemForm;