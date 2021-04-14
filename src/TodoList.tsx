import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValueType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button} from "@material-ui/core";
import {CheckBox, Delete} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import Checkbox from "@material-ui/core/Checkbox";

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
                {/*<input onClick={changeTaskStatus} type="checkbox" checked={t.isDone}/>*/}
                <Checkbox
                    color={"primary"}
                    checked={t.isDone}
                    onChange={changeTaskStatus}
                />
                <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                {/*<span>{t.title}</span>*/}
                <IconButton onClick={removeTask}>
                    <Delete/>
                </IconButton>
                {/*<button onClick={removeTask}>X</button>*/}
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
                {/*<button onClick={removeTodoList}>X</button>*/}
                <IconButton onClick={removeTodoList}>
                    <Delete/>
                </IconButton>
            </h3>

            <AddItemForm addItem={AddTask}/>
            <ul  style={{listStyle: "none", padding: "0px"}}>
                {tasks}
            </ul>
            <div>
                <Button
                    style={{marginRight: "5px"}}
                    size={"small"}
                    color={"primary"}
                    variant={props.filter === "all" ? "outlined" : "contained"}
                    // className={props.filter === "all" ? "active-filter" : ""}
                    onClick={setAllFilterValue}>All</Button>
                <Button
                    style={{marginRight: "5px"}}
                    size={"small"}
                    color={"primary"}
                    variant={props.filter === "active" ? "outlined" : "contained"}
                    // className={props.filter === "active" ? "active-filter" : ""}
                    onClick={setActiveFilterValue}>Active</Button>
                <Button
                    style={{marginRight: "5px"}}
                    size={"small"}
                    color={"primary"}
                    variant={props.filter === "completed" ? "outlined" : "contained"}
                    // className={props.filter === "completed" ? "active-filter" : ""}
                    onClick={setCompletedFilterValue}>Completed</Button>
            </div>
        </div>
    )
}

export default TodoList;