import React from 'react';
import { colorNames } from './colors';
import TodoColor from './TodoColor';

function TodoColorPicker({ color, onChange }) {
    return (
        <div
            style={{
                display: 'flex',
            }}
        >
            {colorNames.map((_, i) => (
                <TodoColor 
                    color={i}
                    onClick={color => onChange(color)}
                    selected={color === i}
                    key={i}
                />
            ))}
        </div>
    );
}

export default TodoColorPicker;