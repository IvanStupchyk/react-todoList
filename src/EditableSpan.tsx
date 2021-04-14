import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

function EditableSpan(props: EditableSpanPropsType) {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState<string>(props.title)
    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        setEditMode(false)
        props.changeTitle(title)
    }

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)


    return (
        editMode
            ? <TextField
                color={"primary"}
                variant={"standard"}
                value={title}
                autoFocus
                onBlur={offEditMode}
                onChange={changeTitle}
            />
            // ? <input
            //     value={title}
            //     onChange={changeTitle}
            //     autoFocus
            //     onBlur={offEditMode}
            // />
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    )
}

export default EditableSpan