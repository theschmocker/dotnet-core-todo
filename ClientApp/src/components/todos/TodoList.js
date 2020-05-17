import React from 'react';

import Todo from './Todo';
import { useTodos } from '../../state/TodoContext';

function Loader({ className = '', label }) {
    return (
        <div className={`spinner-grow text-primary ${className}`} role="status">
            <span className="sr-only">{label}</span>
        </div>
    )
}

function TodoList() {
    const { todos, loading, sortOption } = useTodos();

    if (loading && !todos) return <Loader label="Loading todos" className="float-right" />;

    return (
        <>
            {loading && <Loader label="Updating" className="float-right" />}
            {todos && todos.length ? (
                <ul className="list-group">
                        {todos.map(todo => ( 
                            <Todo todo={todo} key={todo.id} />
                        ))}
                </ul>
            ) : (
                <div>
                    No todos. {sortOption !== 'Done' && 'Have a great day!'}
                </div>
            )}
        </>
    );
}

export default TodoList;