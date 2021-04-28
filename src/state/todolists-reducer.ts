import {FilterValueType, TodoListType} from "../App";
import {v1} from "uuid";

export type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST'
    todoListID: string
}

export type AddTodoListAT = {
    type: 'ADD-TODOLIST'
    title: string
    todoListID: string
}

type ChangeTodoListTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    todoListID: string
}

type ChangeTodoListАFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    newFilterValue: FilterValueType
    todoListID: string
}

type ActionsType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListTitleAT | ChangeTodoListАFilterAT

export const todoListReducer = (todoLists: Array<TodoListType>, action: ActionsType): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todoLists.filter(tl => tl.id !== action.todoListID)
        case "ADD-TODOLIST":
            const newTodoList: TodoListType = {
                id: action.todoListID, title: action.title, filter: 'all'
            }

            return [...todoLists, newTodoList]
        case "CHANGE-TODOLIST-TITLE":
            return todoLists.map(tl => tl.id === action.todoListID ? {...tl, title: action.title} : tl)
        case "CHANGE-TODOLIST-FILTER":
            return todoLists.map(tl => tl.id === action.todoListID ? {...tl, filter: action.newFilterValue} : tl)
        default:
            return todoLists
    }
}

export const removeTodoListAC = (todoListID: string): RemoveTodoListAT => {
    return {
        type: 'REMOVE-TODOLIST',
        todoListID
    }
}

export const addTodoListAC = (title: string): AddTodoListAT => {
    return {
        type: 'ADD-TODOLIST',
        title,
        todoListID: v1()
    }
}

export const changeTodoListTitleAC = (title: string, todoListID: string): ChangeTodoListTitleAT => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        title,
        todoListID
    }
}

export const changeTodoListАFilterAC = (newFilterValue: FilterValueType, todoListID: string): ChangeTodoListАFilterAT => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        newFilterValue,
        todoListID
    }
}