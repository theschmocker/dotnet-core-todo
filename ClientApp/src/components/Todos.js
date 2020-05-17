import React, { useState } from 'react';
import { useTodos } from '../state/TodoContext';

import TodoSort from './todos/TodoSort';
import TodoList from './todos/TodoList';
import TodoColorPicker from './todos/TodoColorPicker';

function Todos() {
    const { createTodo, error } = useTodos();
    const [text, setText] = useState('');
    const [color, setColor] = useState(0);

    const onSubmit = async e => {
        e.preventDefault();

        if (text.trim().length) {
            const todoText = text.trim();

            try {
                await createTodo({
                    text: todoText,
                    done: false,
                    color,
                });

                setText('');
                setColor(0);
            } catch (e) {}

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
                <div className="form-group">
                    <label htmlFor="color-picker">Color</label>
                    <TodoColorPicker 
                        id="color-picker"
                        color={color}
                        onChange={setColor}
                    />
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