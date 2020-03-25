import React, { useState } from 'react';
import { useTodos } from '../state/TodoContext';

import TodoList from './todos/TodoList';

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