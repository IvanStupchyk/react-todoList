import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {IconButton} from "@material-ui/core";
import {AddBox, Title} from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

function AddItemForm(props: AddItemFormPropsType) {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<string | null>("")

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }

    const errorMessage = error ? <div className={"error-message"}>{error}</div> : null

    const addItem = () => {
        if (title.trim()) {
            props.addItem(title)
            setTitle("")
        } else {
            setError('Title is required')
        }
    }

    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        setError("")
        if (e.key === "Enter") {
            addItem()
        }
    }

    return (
        <div>
            <TextField
                variant={"outlined"}
                value={title}
                onChange={changeTitle}
                onKeyPress={onKeyPressAddItem}
                label={"Title"}
                error={!!error}
                helperText={error}
            />
            {/*<input value={title}*/}
            {/*       onChange={changeTitle}*/}
            {/*       onKeyPress={onKeyPressAddItem}*/}
            {/*       className={error ? "error-input" : ""}*/}
            {/*/>*/}
            <IconButton onClick={addItem} color={"primary"}>
                <AddBox/>
            </IconButton>
            {/*<button onClick={addItem}>+</button>*/}
            {/*{error && <div className={"error-message"}>{error}</div>}*/}
        </div>
    )
}


export default AddItemForm