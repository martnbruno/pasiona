import { useState } from "react";
import Task from "./components/Task";
import AddTask from "./components/AddTask";

function App() {
  const [tasks, setTasks] = useState([]);

  // Add Task
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1;
    const newTask = { id, ...task };
    setTasks([...tasks, newTask]);
  };

  // Delete Task
  const deleteTask = (id) => {
    const deletedTasks = tasks.filter((task) => task.id !== id);
    setTasks(deletedTasks);
  };

  return (
    <>
      <h1 data-testid="app-title">Pasiona's To Do List</h1>
      <div className="container">
        <div className="row">
          <div className="twelve column">
            <AddTask onAdd={addTask} />
          </div>
          <div className="twelve column">
            <h2>My Tasks</h2>
            {tasks.map((task) => (
              <Task key={task.id} task={task} onDelete={deleteTask} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
