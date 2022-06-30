import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import {
  Memo,
  CHAR_WARNING_THRESHOLD,
  MAX_CHARS_BODY,
  TITLE_PLACEHOLDER_TEXT,
  BODY_PLACEHOLDER_TEXT,
  DELETE_BUTTON_TEXT,
} from "../components/Memo";

afterEach(cleanup);

const EXAMPLE_TITLE_TEXT = "Example title";
const EXAMPLE_BODY_TEXT = "Example body";

const mockMemoDataA = { id: 1, created_date: new Date(), title: EXAMPLE_TITLE_TEXT, body: EXAMPLE_BODY_TEXT };
const mockMemoDataB = { id: 2, created_date: new Date(), title: "", body: "" };
const mockMemoDataArr = [mockMemoDataA, mockMemoDataB];
const mockSetMemoDataArr = arr => arr;

test("A memo with blank fields will display placeholder text", () => {
  render(<Memo memoDataArr={mockMemoDataArr} setMemoDataArr={mockSetMemoDataArr} memoData={mockMemoDataB} />);
  const placeholderTitle = screen.getByPlaceholderText(TITLE_PLACEHOLDER_TEXT);
  const placeholderBody = screen.getByPlaceholderText(BODY_PLACEHOLDER_TEXT);

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

test("A memo's delete button will only display when the memo is hovered over", () => {
  render(<Memo memoDataArr={mockMemoDataArr} setMemoDataArr={mockSetMemoDataArr} memoData={mockMemoDataA} />);
  const memo = screen.getByTestId(`memo-tile-${mockMemoDataA.id}`);

  fireEvent.mouseEnter(memo);
  const deleteBtn = screen.getByText(DELETE_BUTTON_TEXT);
  expect(deleteBtn).toBeVisible();

  fireEvent.mouseLeave(memo);
  expect(deleteBtn).not.toBeVisible();
});

test("A character count warning is displayed when the body text approaches the limit", () => {
  const mockData = mockMemoDataA;
  while (mockData.body.length < MAX_CHARS_BODY - CHAR_WARNING_THRESHOLD) {
    mockData.body += "A";
  }
  render(<Memo memoDataArr={mockMemoDataArr} setMemoDataArr={mockSetMemoDataArr} memoData={mockData} />);
  const charWarning = screen.getByTestId(`char-warning-${mockData.id}`);
  expect(charWarning).toBeVisible();
});

//TODO: Complete below tests

test("Blurring a text field triggers a request to update the memo array", () => {});

test("Having updated the memo array, an 'updated' popup is displayed", () => {});
