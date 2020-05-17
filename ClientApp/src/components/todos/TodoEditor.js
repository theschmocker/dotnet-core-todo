import React, { useState } from 'react';
import TodoColorPicker from './TodoColorPicker';

function TodoEditor ({ todo, onCancel, onSave }) {
    const [text, setText] = useState(todo.text);
    const [color, setColor] = useState(todo.color);

    const save = () => { 
        onSave({ ...todo, text, color });
        onCancel();
    };

    return (
        <li className="list-group-item d-flex align-items-center">
            <div className="form-group mb-0">
                <input className="form-control" value={text} onChange={e => setText(e.target.value)} />
            </div>
            <div className="form-group mb-0">
                <TodoColorPicker color={color} onChange={setColor} />
            </div>
            <div className="form-group mb-0 ml-auto">
                <button className="btn btn-outline-secondary" onClick={onCancel}>Cancel</button>
                <button className="btn btn-outline-secondary ml-1" onClick={save}>Save</button>
            </div>
        </li>
    );
}

export default TodoEditor;