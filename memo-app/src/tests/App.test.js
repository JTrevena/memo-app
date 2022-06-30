import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import App from "../App";

afterEach(cleanup);

test("renders memo board heading", () => {
  render(<App />);
  const heading = screen.getByText("Memo Board");
  expect(heading).toBeInTheDocument();
});

test("renders add new memo button", () => {
  render(<App />);
  const newMemoBtn = screen.getByText("Add a New Memo!");
  expect(newMemoBtn).toBeInTheDocument();
});

test("sort button renders with options when hovered over", () => {
  render(<App />);
  const sortBtn = screen.getByText("Sort by...");
  expect(sortBtn).toBeInTheDocument();

  fireEvent.mouseEnter(sortBtn);

  const titleOption = screen.getByText("Title (Alphabetically)");
  const dateOption = screen.getByText("Date Created (Oldest first)");

  expect(titleOption).toBeVisible();
  expect(dateOption).toBeVisible();
});

//TODO: Complete below tests

test("A new memo will have its title focused upon", () => {});

test("A memo is no longer displayed after having been deleted", () => {});
