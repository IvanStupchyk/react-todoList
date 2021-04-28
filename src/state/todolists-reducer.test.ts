import {
    addTodoListAC,
    changeTodoListTitleAC,
    changeTodoListАFilterAC,
    removeTodoListAC,
    todoListReducer
} from './todolists-reducer';
import {v1} from 'uuid';
import {TodoListType} from '../App';

test('correct todoList should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = todoListReducer(startState, removeTodoListAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
})

test('new todoList should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = todoListReducer(startState, addTodoListAC('New TodoList'))

    expect(endState.length).toBe(3);
})

test('correct todoList title value should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = todoListReducer(startState, changeTodoListTitleAC('qwe', todolistId1))

    expect(endState[0].title).toBe('qwe');
})

test('correct todoList filter value should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = todoListReducer(startState, changeTodoListАFilterAC('completed', todolistId2))

    expect(endState[1].filter).toBe('completed');
})
