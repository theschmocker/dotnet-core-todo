import React, { useState, useEffect } from 'react';
import authService from '../api-authorization/AuthorizeService'
import { useTodos } from '../state/TodoContext';

function Todo ({ todo, onToggle, onDelete, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);

    const onSave = todo => onUpdate(todo);

    if (isEditing) return <TodoEditor todo={todo} onCancel={() => setIsEditing(false)} onSave={onSave}/>

    return (
        <li className="list-group-item d-flex align-items-center">
            <input type="checkbox" checked={todo.done} onChange={() => onToggle(todo)} />
            <span className="ml-2" style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>{todo.text}</span>
            <button className="btn btn-outline-secondary ml-auto" onClick={() => setIsEditing(true)}>Edit</button>
            <button className="btn btn-outline-secondary ml-1" onClick={() => onDelete(todo)}>Delete</button>
        </li>
    );
}

function TodoEditor ({ todo, onCancel, onSave }) {
    const [text, setText] = useState(todo.text);

    const save = () => { 
        onSave({ ...todo, text });
        onCancel();
    };

    return (
        <li className="list-group-item d-flex align-items-center">
            <div className="form-group mb-0">
                <input className="form-control" value={text} onChange={e => setText(e.target.value)} />
            </div>
            <div className="form-group mb-0 ml-auto">
                <button className="btn btn-outline-secondary" onClick={onCancel}>Cancel</button>
                <button className="btn btn-outline-secondary ml-1" onClick={save}>Save</button>
            </div>
        </li>
    );
}

function TodoList({ loading, todos, onToggle, onDelete, onUpdate }) {
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
                    {todos.map(todo => ( 
                        <Todo 
                            todo={todo}
                            onToggle={onToggle}
                            onDelete={onDelete}
                            onUpdate={onUpdate}
                            key={todo.id}
                        />
                    ))}
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
                onUpdate={updateTodo}
            />
        </div>
    );
}

export default Todos;