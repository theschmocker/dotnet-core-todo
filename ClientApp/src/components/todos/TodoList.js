import React from 'react';

import Todo from './Todo';
import { useTodos } from '../../state/TodoContext';

function TodoList() {
    const { todos, loading } = useTodos();

    if (loading && !todos) {
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
                        <Todo todo={todo} key={todo.id} />
                    ))}
            </ul>
        ) : (
            <div>No todos. Have a great day!</div>
        )
    );
}

export default TodoList;