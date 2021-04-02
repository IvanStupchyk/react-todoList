import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValueType, TaskType} from "./App";

type TodoListPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    changeTodoListFilter: (newFilterValue: FilterValueType, todoListID: string) => void
    removeTask: (taskId: string, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    filter: FilterValueType
    changeTaskStatus: (taskId: string, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
}


function TodoList(props: TodoListPropsType) {
    const tasks = props.tasks.map(t => {
        const removeTask = () => props.removeTask(t.id, props.id)
        const changeTaskStatus = () => props.changeTaskStatus(t.id, props.id)

        return (
            <li key={t.id}>
                <input onClick={changeTaskStatus} type="checkbox" checked={t.isDone}/>
                <span className={t.isDone ? "is-done" : ""}>{t.title}</span>
                <button onClick={removeTask}>X</button>
            </li>
        )
    })

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<string>("")

    const setAllFilterValue = () => props.changeTodoListFilter('all', props.id )
    const setActiveFilterValue = () => props.changeTodoListFilter('active', props.id)
    const setCompletedFilterValue = () => props.changeTodoListFilter('completed', props.id)
    const addTask = () => {
        if (title.trim()) {
            props.addTask(title, props.id)
            setTitle("")
        } else {
            setError('Title is required')
        }
    }
    const removeTodoList = () => props.removeTodoList(props.id)
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        setError("")
        if (e.key === "Enter") {
            addTask()
        }
    }

    return (
        <div>
            <h3>{props.title}<button onClick={removeTodoList}>X</button></h3>
            <div>
                <input value={title}
                       onChange={changeTitle}
                       onKeyPress={onKeyPressAddTask}
                       className={error ? "error-input" : ""}
                />
                <button onClick={addTask}>+</button>
            </div>
            {error && <div className={"error-message"}>{error}</div>}
            <ul>
                {tasks}
            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter" : ""} onClick={setAllFilterValue}>All
                </button>
                <button className={props.filter === "active" ? "active-filter" : ""}
                        onClick={setActiveFilterValue}>Active
                </button>
                <button className={props.filter === "completed" ? "active-filter" : ""}
                        onClick={setCompletedFilterValue}>Completed
                </button>
            </div>
        </div>
    )
}

export default TodoList;