function TodoList({ task, handleDelete, completed, handleClick }) {
  return (
    <>
      <li 
        className={completed ? 'completed' : ''}
        onClick={handleClick}
      >
        {task}
      </li>
      <button onClick={handleDelete}>remove</button>
    </>
  )
}

export default TodoList