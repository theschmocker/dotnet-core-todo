import React from 'react';
import { getColorName, getColor } from './colors';

function TodoColor({ color, onClick, selected = false, size = 25, ...props }) {
    const isButton = typeof onClick === 'function';
    const Element = isButton ? 'button' : 'div';

    const colorName = getColorName(color);
    const colorValue = getColor(color);

    return (
        <Element 
            className="todo-color" 
            aria-label={colorName} 
            onClick={() => onClick(color)}
            type={isButton ? 'button' : null}
            style={{
                display: 'inline-block',
                border: selected ? '2px solid black' : 'none',
                borderRadius: '50%',
                height: size,
                width: size,
                background: colorValue,
            }}
            {...props}
        />
    )
}

export default TodoColor;