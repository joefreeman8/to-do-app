import React, { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import TodoList from './components/TodoList'


function App() {

  const [newTodo, setNewTodo] = useState('')
  // the state below runs on the mount of the page, checking and getting the todos from storage.
  const [todoList, setTodoList] = useState(() => {
    const storedTodos = window.localStorage.getItem('todoList')
    if (storedTodos) {
      // parse string to become array.
      return JSON.parse(storedTodos)
    }
    return []
  })
  const hasNewTodo = !!newTodo.trim()

  // ********** SET TO LOCAL STORAGE **********
  // useEffect allows us to react to the value updating (adding, completing, deleting), then setItem to localStorage changing it from an object to JSON (a string) 
  useEffect(() => {
    window.localStorage.setItem('todoList', JSON.stringify(todoList))
  }, [todoList])


  // ********** REMAINING TODOS COUNTER **********
  // filtering to find incomplete todos and then .length to count them. 
  const remainingTodos = todoList.filter(todo => !todo.completed).length


  // ********** ADD NEW TODO FUNCTION **********
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!hasNewTodo) return 
    // new todo object which gets added to the list. 
    const createdTodo = {
      task: newTodo,
      completed: false,
      id: uuid(),
    }
    // spread in old todos (...todoList) and add new todo at the end (createdTodo)
    setTodoList([...todoList, createdTodo])
    setNewTodo('')
  }


  // ********** CAPTURE WHAT THE USER IS TYPING FOR THEIR NEW TODO **********
  const handleChange = (e) => {
    setNewTodo(e.target.value)
  }


  // ********** COMPLETED TODO FUNCTION **********
  const toggleCompleted = (todoId) => {
    const completedTodos = todoList.map(todo => {
      if (todo.id === todoId) {
        // return new object and spread in old todo and update completed boolean to toggle on and off with the bang.
        return { ...todo, completed: !todo.completed }
      }
      // return uncompleted todo's in original state
      return todo
    })
    setTodoList(completedTodos)
  }


    // ********** DELETE TODO FUNCTION **********
    // filter array of todos and only return the ID's which we are not looking for. This will then work as a delete
    const deleteTodo = (todoIdToRemove) => {
      const filteredTodos = todoList.filter(todo => {
        return todo.id !== todoIdToRemove 
      }
    )
      setTodoList(filteredTodos)
    }


  //  ********** DELETE COMPLETED TODO FUNCTION **********
  // filter array of todos and only return the ones which are completed: false
  // otherwise return nothing.
  const deleteCompletedTodo = (completedTrueRemove) => {
    const filteredCompletedTodos = todoList.filter(todo => {
      if (todo.completed !== true) {
        return completedTrueRemove
      }
      // eslint-disable-next-line array-callback-return
      return
    }) 
    setTodoList(filteredCompletedTodos)
  }



  return (
    <main>
      <h1>You have {remainingTodos} task(s) to be completed</h1>
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