import React from 'react'
import './App.css';

export default function ToDo( { todo, toggleTodo } ) {
    function handleTodoClick(){
        toggleTodo(todo.id)
    }
    return (
        <div>
            <label className='checkbox'>
                <input type="checkbox" checked={todo.complete} onChange={handleTodoClick}/>
                {todo.name}
            </label>
        </div>
    )
}
