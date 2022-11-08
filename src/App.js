import React,{ useState, useRef, useEffect } from 'react';
import ToDoList from './ToDoList';
import { v4 as uuidv4 } from 'uuid';
import './App.css';


const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos( prevTodos => [...prevTodos, ...storedTodos] );
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])


  function toggleTodo(id){
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e){
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(prevTodos => {
      return[...prevTodos, {id:uuidv4(), name:name, complete:false}]
    })
    todoNameRef.current.value = null
  }

  function handleClearTodos(){
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <>
      <div className="app">
        <h1>My ToDoList</h1>
        <div className="todo">
          <ToDoList todos = {todos} toggleTodo= {toggleTodo}/>
        </div>
        <input ref={todoNameRef} type="text" className="input"/>
        <button className="btn" onClick={handleAddTodo}>Add ToDo</button>
        <button className="btn" onClick={handleClearTodos}>Clear Completed ToDo</button>
        <div>{todos.filter(todo => !todo.complete).length} left ToDo</div>
      </div>
    </>
  )
}

export default App;
