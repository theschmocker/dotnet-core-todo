import React, { createContext, useContext } from 'react'
import useSwr, { mutate } from 'swr';

import request from '../api-authorization/AuthorizedRequest';

const TodoContext = createContext()

export const useTodos = () => {
    const value = useContext(TodoContext);

    return value;
}

export function TodoProvider({ children }) {
    const { data: todos, error, isValidating } = useSwr('todo', request);

    async function createTodo(newTodo) {
        await request('todo', { method: 'POST', body: newTodo})
        mutate('todo', todos => [...todos, {id: -1, ...newTodo}]);
    }

    async function updateTodo(todo) {
        await request('todo', { method: 'PUT', body: todo})
        mutate('todo', todos => todos.map(t => t.id === todo.id ? todo : t));
    }

    async function deleteTodo(todo) {
        await request('todo', { method: 'DELETE', body: todo})
        mutate('todo', todos => todos.filter(t => t.id !== todo.id));
    }

    const value = {
        todos,
        createTodo,
        updateTodo,
        deleteTodo,
        error,
        loading: isValidating,
    }; 

    return (
        <TodoContext.Provider value={value}>
            {children}
        </TodoContext.Provider>
    )
}