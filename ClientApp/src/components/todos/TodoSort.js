import React from 'react';

import { useTodos } from '../../state/TodoContext';

function TodoSort() {
    const { sortOptions, sortOption, setSortOption } = useTodos();

    return (
        <div className="btn-group mb-4">
            {sortOptions.map(option => (
                <button 
                    className={`btn flex-grow-0 flex-shrink-0 ${option === sortOption ? 'btn-primary active' : 'btn-outline-primary'}`}
                    onClick={() => setSortOption(option)}
                    aria-pressed={option === sortOption}
                    key={option}
                >
                        {option}
                </button>
            ))}
        </div>
    );
}

export default TodoSort;