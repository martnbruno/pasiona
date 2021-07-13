import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import AddTask from "../components/AddTask";

const addTask = jest.fn();

test("<AddTask /> Rendering AddTask", () => {
  render(<AddTask onAdd={addTask} />);

  // AddTask title.
  const addTaskTitle = screen.getByTestId("addtask-title");
  expect(addTaskTitle).toBeInTheDocument();
  expect(addTaskTitle.tagName).toBe("H2");
  expect(addTaskTitle.tagName).not.toBe("H1");
  expect(addTaskTitle.textContent).toBe("New Task");

  // AddTask input.
  const taskInput = screen.getByTestId("task-input");
  expect(taskInput).toBeInTheDocument();
  expect(taskInput.tagName).toBe("INPUT");
  expect(taskInput.tagName).not.toBe("BUTTON");

  // Save Task button.
  const btnSubmit = screen.getByTestId("btn-submit");
  expect(btnSubmit).toBeInTheDocument();
  expect(btnSubmit.tagName).toBe("BUTTON");
  expect(btnSubmit.tagName).not.toBe("INPUT");
  expect(btnSubmit.textContent).toBe("Save Task");
});

test("<AddTask /> Form validation", () => {
  render(<AddTask onAdd={addTask} />);

  // Clicking on Save Task button.
  const btnSubmit = screen.getByTestId("btn-submit");
  userEvent.click(btnSubmit);

  // Testing alert that displays when input was incorrectly filled in.
  const alert = screen.getByTestId("alert");
  expect(alert).toBeInTheDocument();
  expect(alert.textContent).toBe("Please add a task.");
  expect(alert.tagName).toBe("P");
});

test("<AddTask /> Adding a task correctly", () => {
  render(<AddTask onAdd={addTask} />);

  // Filling in input and clicking on Save Task button.
  const taskInput = screen.getByTestId("task-input");
  userEvent.type(taskInput, "Buy groceries");
  const btnSubmit = screen.getByTestId("btn-submit");
  userEvent.click(btnSubmit);

  // Testing that alert isn't displaying when input was correctly filled in.
  const alert = screen.queryByTestId("alert");
  expect(alert).not.toBeInTheDocument();

  // Saving task and testing that addTask function was called just once.
  expect(addTask).toHaveBeenCalled();
  expect(addTask).toHaveBeenCalledTimes(1);
});
