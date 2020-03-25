import React, { useState } from 'react';

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

export default TodoEditor;