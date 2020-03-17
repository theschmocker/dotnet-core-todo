import React, { useState, useEffect } from 'react';
import authService from './api-authorization/AuthorizeService'
import useSwr, { mutate } from 'swr';

const request = async (endpoint, options = {}) => {
    const token = await authService.getAccessToken();

    const defaultOptions = {
        method: options.method || 'GET',
        body: options.body ? JSON.stringify(options.body) : null,
        headers: !token ? {} : {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };

    return fetch(endpoint, defaultOptions).then(res => res.json());
}

const useTodos = () => {
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

    return {
        todos,
        createTodo,
        updateTodo,
        deleteTodo,
        error,
        loading: isValidating,
    }
}

function TodoList({ loading, todos, onToggle, onDelete }) {
    if (loading) {
        return (
            <div className="spinner-grow text-primary" role="status">
                <span className="sr-only">Loading todos</span>
            </div>
        );
    }

    return(
        todos && todos.length ? (
            <ul className="list-group">
                    {todos.map(todo => ( <li className="list-group-item d-flex align-items-center" key={todo.id}>
                        <input type="checkbox" checked={todo.done} onChange={() => onToggle(todo)} />
                        <span className="ml-2" style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>{todo.text}</span>
                        <button className="btn btn-outline-secondary ml-auto" onClick={() => onDelete(todo)}>Delete</button>
                    </li>))}
            </ul>
        ) : (
            <div>No todos. Have a great day!</div>
        )
    );
}

function Todos() {
    const { todos, createTodo, updateTodo, deleteTodo, error, loading } = useTodos();
    const [text, setText] = useState('');

    const onSubmit = e => {
        e.preventDefault();

        if (text.trim().length) {
            createTodo({
                text: text.trim(),
                done: false,
            }).then(() => setText(''));
        }
    }

    const toggleDone = todo => updateTodo({...todo, done: !todo.done})

    return (
        <div className="container">
            <h1>Todos</h1>
            <form className="mb-4" onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="todo-text">Todo Text</label>
                    <input className="form-control" id="todo-text" type="text" value={text} onChange={e => setText(e.target.value)} />
                </div>
                <button className="btn btn-primary">Add</button>
            </form>
            {error && <div className="alert alert-danger">Couldn't load latest todo list. Changes may not be saved.</div>}
            <TodoList
                loading={!todos && loading}
                todos={todos}
                onToggle={todo => toggleDone(todo)}
                onDelete={todo => deleteTodo(todo)}
            />
        </div>
    );
}

export default Todos;