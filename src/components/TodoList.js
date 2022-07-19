// destructuring the props so I can bypass the word "props"
function TodoList({ task, completed, handleDelete, handleClick }) {
  return (
    <>
      <li 
      // the class below has control flow means, is completed true ? if yes then add class 'completed' otherwise add nothing
        className={completed ? 'completed' : ''}
        onClick={handleClick}
      >
        {task}
      </li>
      <div className="delete-button-container">
        <button className="delete-button" onClick={handleDelete}>remove</button>
      </div>
    </>
  )
}

export default TodoList