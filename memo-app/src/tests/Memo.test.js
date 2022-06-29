import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { Memo, CHAR_WARNING_THRESHOLD, MAX_CHARS_BODY } from "../components/Memo";

afterEach(cleanup);

const EXAMPLE_TITLE_TEXT = "Example title";
const EXAMPLE_BODY_TEXT = "Example body";

const mockMemoDataA = { id: 1, created_date: new Date(), title: EXAMPLE_TITLE_TEXT, body: EXAMPLE_BODY_TEXT };
const mockMemoDataB = { id: 2, created_date: new Date(), title: "", body: "" };
const mockMemoDataArr = [mockMemoDataA, mockMemoDataB];
const mockSetMemoDataArr = arr => arr;

test("A memo with blank fields will display placeholder text", () => {
  render(<Memo memoDataArr={mockMemoDataArr} setMemoDataArr={mockSetMemoDataArr} memoData={mockMemoDataB} />);
  const placeholderTitle = screen.getByPlaceholderText("Memo Title");
  const placeholderBody = screen.getByPlaceholderText("notes...");

  expect(placeholderTitle).toBeVisible();
  expect(placeholderBody).toBeVisible();
});

test("A memo will render text passed in through the memoData prop", () => {
  render(<Memo memoDataArr={mockMemoDataArr} setMemoDataArr={mockSetMemoDataArr} memoData={mockMemoDataA} />);
  const mockTitle = screen.getByText(EXAMPLE_TITLE_TEXT);
  const mockBody = screen.getByText(EXAMPLE_BODY_TEXT);

  expect(mockTitle).toBeVisible();
  expect(mockBody).toBeVisible();
});

test("A memo's delete button will only display when the memo is hovered over", () => {});

test("A character count warning is displayed when the body text approaches the limit", () => {});

test("Blurring a text field triggers a request to update the memo array", () => {});

test("Having updated the memo array, an 'updated' popup is displayed", () => {});
