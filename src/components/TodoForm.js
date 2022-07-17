// destructuring the props so I can bypass the word "props"
function TodoForm ({ handleSubmit, newTodo, handleChange, hasNewTodo}) {

  return (
    <form onSubmit={handleSubmit}>
    <input placeholder="Task" value={newTodo} onChange={handleChange} />
    <button disabled={!hasNewTodo}>Add</button>
  </form>
  )
}

export default TodoForm