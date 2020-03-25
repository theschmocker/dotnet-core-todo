import React, { useState } from 'react';

import TodoEditor from './TodoEditor';

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

export default Todo;