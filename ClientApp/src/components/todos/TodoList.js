import React from 'react';

import Todo from './Todo';

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

export default TodoList;