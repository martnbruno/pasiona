import { useState } from "react";

const AddTask = ({ onAdd }) => {
  const [text, setText] = useState("");
  const [error, setError] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      setError(true);
      return;
    }

    setError(false);

    onAdd({ text });

    setText("");
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <h2 data-testid="addtask-title">New Task</h2>
        {error ? (
          <p data-testid="alert" className="alert-error">
            Please add a task.
          </p>
        ) : null}

        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add Task"
          className="u-full-width"
          data-testid="task-input"
        />
      </div>

      <button
        type="submit"
        value="Save Task"
        className="button-primary u-full-width"
        data-testid="btn-submit"
      >
        Save Task
      </button>
    </form>
  );
};

export default AddTask;
