/* eslint-disable no-lone-blocks */
import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'
import TodoList from './components/TodoList'

function App() {

  const [newTodo, setNewTodo] = useState('')
  const [todoList, setTodoList] = useState([])

  // Handle adding a new To-Do
  const handleSubmit = (e) => {
    e.preventDefault()

    const createdTodo = {
      task: newTodo,
      completed: false,
      id: uuid(),
    }
    setTodoList([...todoList, createdTodo])
    setNewTodo('')
  }

  // Set the e.target.value (contents) of a new todo to handleChange
  const handleChange = (e) => {
    setNewTodo(e.target.value)
  }


  return (
    <main>
      <h1>Hello, you have X remaining to do</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Task" value={newTodo} onChange={handleChange} />
        <button>Add</button>
      </form>
      <ul>
        {todoList.map(todo => (
          <TodoList
            key={todo.id}
            task={todo.task} 
          />
        ))}
      </ul>

    </main>
  )
}

export default App

{/* <div className="App">
<header className="App-header">
  <img src={logo} className="App-logo" alt="logo" />
  <p>
    Edit <code>src/App.js</code> and save to reload.
  </p>
  <a
    className="App-link"
    href="https://reactjs.org"
    target="_blank"
    rel="noopener noreferrer"
  >
    Learn React
  </a>
</header>
</div> */}