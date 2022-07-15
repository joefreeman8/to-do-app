/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import TodoList from './components/TodoList'

function App() {

  const [newTodo, setNewTodo] = useState('')
  const [todoList, setTodoList] = useState(() => {
    const storedTodos = window.localStorage.getItem('todoList')
    if (storedTodos) {
      return JSON.parse(storedTodos)
    }
    return []
  })
  const hasNewTodo = !!newTodo.trim()

  // *** SET TO LOCAL STORAGE ***
  useEffect(() => {
    window.localStorage.setItem('todoList', JSON.stringify(todoList))
  }, [todoList])


  // *** REMAINING TODOS COUNTER ***
  const remainingTodos = todoList.filter(todo => !todo.completed).length


  // *** ADD TODO FUNCTION ***
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!hasNewTodo) return 
    
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


  // *** DELETE TODO FUNCTION ***
  const deleteTodo = (todoIdToRemove) => {
    const filteredTodos = todoList.filter(todo => {
      return todo.id !== todoIdToRemove
    })
    setTodoList(filteredTodos)
  }


  // *** COMPLETED TODO FUNCTION ***
  const toggleCompleted = (todoId) => {
    const completedTodos = todoList.map(todo => {
      if (todo.id === todoId) {
        return { ...todo, completed: !todo.completed }
      }
      return todo
    })
    setTodoList(completedTodos)
  }


  //  *** DELETE COMPLETED TODO FUNCTION ***
  const deleteCompletedTodo = (completedTrueRemove) => {
    const filteredCompletedTodos = todoList.filter(todo => {
      if (todo.completed !== true) {
        return completedTrueRemove
      // eslint-disable-next-line array-callback-return
      } return
    }) 
    setTodoList(filteredCompletedTodos)
  }

  return (
    <main>
      <h1>Hello, you have {remainingTodos} remaining to do</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Task" value={newTodo} onChange={handleChange} />
        <button disabled={!hasNewTodo}>Add</button>
      </form>
      <ul>
        {todoList.map(todo => (
          <TodoList
            key={todo.id}
            task={todo.task} 
            completed={todo.completed}
            handleDelete={() => deleteTodo(todo.id)}
            handleClick={() => toggleCompleted(todo.id)}
          />
        ))}
      </ul>
      <button onClick={deleteCompletedTodo}>Remove all completed</button>

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