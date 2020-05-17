import React, { createContext, useContext, useState } from 'react'
import useSwr, { mutate } from 'swr';

import request from '../api-authorization/AuthorizedRequest';

const TodoContext = createContext()

export const useTodos = () => {
    const value = useContext(TodoContext);

    return value;
}

const NOT_DONE = 'Not Done';
const DONE = 'Done';
const ALL = 'All';

const todoSorts = {
    [NOT_DONE]: todos => todos.filter(todo => !todo.done),
    [DONE]: todos => todos.filter(todo => todo.done),
    [ALL]: todos => todos,
}

const sortOptions = Object.keys(todoSorts);

export function TodoProvider({ children }) {
    const { data: todos, error, isValidating } = useSwr('todo', request);

    const [sortOption, setSortOption] = useState(sortOptions[0]);

    async function createTodo(newTodo) {
        mutate('todo', todos => [...todos, {id: -1, ...newTodo}]);
        await request('todo', { method: 'POST', body: newTodo})
    }

    async function updateTodo(todo) {
        mutate('todo', todos => todos.map(t => t.id === todo.id ? todo : t));
        await request('todo', { method: 'PUT', body: todo})
    }

    async function deleteTodo(todo) {
        mutate('todo', todos => todos.filter(t => t.id !== todo.id));
        await request('todo', { method: 'DELETE', body: todo})
    }

    const value = {
        todos: todos && todoSorts[sortOption](todos),
        allTodos: todos,
        createTodo,
        updateTodo,
        deleteTodo,
        error,
        loading: isValidating,
        sortOptions,
        sortOption,
        setSortOption,
    }; 

    return (
        <TodoContext.Provider value={value}>
            {children}
        </TodoContext.Provider>
    )
}