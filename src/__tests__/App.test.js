import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import App from "../App";

test("<App /> Rendering App", () => {
  render(<App />);

  //App title.
  const appTitle = screen.getByTestId("app-title");
  expect(appTitle).toBeInTheDocument();
  expect(appTitle.tagName).toBe("H1");
  expect(appTitle.tagName).not.toBe("H2");
  expect(appTitle.textContent).toBe("Pasiona's To Do List");

  // New Task title.
  expect(screen.getByText("New Task")).toBeInTheDocument();

  // My Tasks title.
  expect(screen.getByText("My Tasks")).toBeInTheDocument();
});

test("<App /> Testing saved tasks exist in the DOM", async () => {
  render(<App />);

  // Filling in input and clicking on Save Task button.
  const taskInput = screen.getByTestId("task-input");
  userEvent.type(taskInput, "Buy groceries");
  const btnSubmit = screen.getByTestId("btn-submit");
  userEvent.click(btnSubmit);

  // Testing that alert isn't displaying when input was correctly filled in.
  const alert = screen.queryByTestId("alert");
  expect(alert).not.toBeInTheDocument();

  // Creating snapshot to test saved tasks exist in the DOM.
  const tasks = await screen.findAllByTestId("savedtask");
  expect(tasks).toMatchSnapshot();

  // Testing specific saved task exists in the DOM.
  expect(screen.getByText("Buy groceries")).toBeInTheDocument();
});

test("<App /> Testing delete button works", () => {
  render(<App />);

  // Filling in input and clicking on Save Task button.
  const taskInput = screen.getByTestId("task-input");
  userEvent.type(taskInput, "Buy groceries");
  const btnSubmit = screen.getByTestId("btn-submit");
  userEvent.click(btnSubmit);

  // Testing that alert isn't displaying when input was correctly filled in.
  const alert = screen.queryByTestId("alert");
  expect(alert).not.toBeInTheDocument();

  // Testing delete button exists.
  const deleteButton = screen.getByTestId("btn-eliminar");
  expect(deleteButton.tagName).toBe("BUTTON");
  expect(deleteButton).toBeInTheDocument();

  // Testing delete button clicks.
  userEvent.click(deleteButton);

  // Testing delete button doesn't exist anymore after deleting task.
  expect(deleteButton).not.toBeInTheDocument();

  // Testing specific saved task doesn't exist anymore after deleting.
  expect(screen.queryByText("Buy groceries")).not.toBeInTheDocument();
});
