import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValueType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";

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
    changeTaskTitle: (taskId: string, title: string, todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
}


function TodoList(props: TodoListPropsType) {
    const tasks = props.tasks.map(t => {
        const removeTask = () => props.removeTask(t.id, props.id)
        const changeTaskStatus = () => props.changeTaskStatus(t.id, props.id)
        const changeTaskTitle = (title: string) => props.changeTaskTitle(t.id, title, props.id)

        return (
            <li key={t.id} className={t.isDone ? "is-done" : ""}>
                <input onClick={changeTaskStatus} type="checkbox" checked={t.isDone}/>
                <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                {/*<span>{t.title}</span>*/}
                <button onClick={removeTask}>X</button>
            </li>
        )
    })


    const setAllFilterValue = () => props.changeTodoListFilter('all', props.id)
    const setActiveFilterValue = () => props.changeTodoListFilter('active', props.id)
    const setCompletedFilterValue = () => props.changeTodoListFilter('completed', props.id)
    const removeTodoList = () => props.removeTodoList(props.id)

    const AddTask = (title: string) => props.addTask(title, props.id)

    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.id)

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <button onClick={removeTodoList}>X</button>
            </h3>

            <AddItemForm addItem={AddTask}/>
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