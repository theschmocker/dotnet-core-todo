import React, { useState } from 'react';

import TodoEditor from './TodoEditor';
import { useTodos } from '../../state/TodoContext';

function Todo ({ todo }) {
    const [isEditing, setIsEditing] = useState(false);
    const { updateTodo, deleteTodo } = useTodos();

    const toggleDone = () => updateTodo({...todo, done: !todo.done})

    if (isEditing) return <TodoEditor todo={todo} onCancel={() => setIsEditing(false)} onSave={updateTodo}/>

    return (
        <li className="list-group-item d-flex align-items-center">
            <input type="checkbox" checked={todo.done} onChange={toggleDone} />
            <span className="ml-2" style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>{todo.text}</span>
            <button className="btn btn-outline-secondary ml-auto" onClick={() => setIsEditing(true)}>Edit</button>
            <button className="btn btn-outline-secondary ml-1" onClick={() => deleteTodo(todo)}>Delete</button>
        </li>
    );
}

export default Todo;