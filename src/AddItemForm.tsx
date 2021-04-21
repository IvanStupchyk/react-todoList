import React, {ChangeEvent, useState, KeyboardEvent} from "react"
import {IconButton} from "@material-ui/core"
import {AddBox, Title} from "@material-ui/icons"
import TextField from "@material-ui/core/TextField"

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

function AddItemForm(props: AddItemFormPropsType) {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>('')

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }

    const addItem = () => {
        if (title.trim()) {
            props.addItem(title)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        setError('')
        e.key === 'Enter' && addItem()
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

            <IconButton onClick={addItem} color={"primary"}>
                <AddBox/>
            </IconButton>
        </div>
    )
}


export default AddItemForm