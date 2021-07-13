const Task = ({ task, onDelete }) => {
  return (
    <div className="task-container" data-testid="savedtask">
      <h3>{task.text}</h3>

      <button
        className="delete"
        onClick={() => onDelete(task.id)}
        data-testid="btn-eliminar"
      >
        X
      </button>
    </div>
  );
};

export default Task;
