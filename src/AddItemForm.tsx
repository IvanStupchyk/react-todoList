import React, {ChangeEvent, useState, KeyboardEvent} from "react";

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
            <input value={title}
                   onChange={changeTitle}
                   onKeyPress={onKeyPressAddItem}
                   className={error ? "error-input" : ""}
            />
            <button onClick={addItem}>+</button>
            {error && <div className={"error-message"}>{error}</div>}
        </div>
    )
}


export default AddItemForm