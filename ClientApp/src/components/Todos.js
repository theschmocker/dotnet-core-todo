import React, { useState } from 'react';
import { useTodos } from '../state/TodoContext';

import TodoSort from './todos/TodoSort';
import TodoList from './todos/TodoList';

function Todos() {
    const { createTodo, error } = useTodos();
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
            <TodoSort />
            <TodoList />
        </div>
    );
}

export default Todos;