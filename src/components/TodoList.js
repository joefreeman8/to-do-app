function TodoList({ task, handleDelete }) {
  return (
    <>
      <li>{task}</li>
      <button onClick={handleDelete}>remove</button>
    </>
  )
}

export default TodoList