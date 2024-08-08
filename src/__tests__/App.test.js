import React from "react";
import "whatwg-fetch";
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { server } from "../mocks/server";

import App from "../components/App";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("displays question prompts after fetching", async () => {
  render(<App />);

  fireEvent.click(screen.getByText(/View Questions/));

  expect(await screen.findByText(/lorem testum 1/g)).toBeInTheDocument();
  expect(await screen.findByText(/lorem testum 2/g)).toBeInTheDocument();
});

test("creates a new question when the form is submitted", async () => {
  render(<App />);

  await screen.findByText(/lorem testum 1/g);

  fireEvent.click(screen.getByText(/New Question/));

  fireEvent.change(screen.getByLabelText(/Prompt/), {
    target: { value: "Test Prompt" },
  });
  fireEvent.change(screen.getByLabelText(/Answer 1/), {
    target: { value: "Test Answer 1" },
  });
  fireEvent.change(screen.getByLabelText(/Answer 2/), {
    target: { value: "Test Answer 2" },
  });
  fireEvent.change(screen.getByLabelText(/Correct Answer Index:/), {
    target: { value: "1" },
  });

  fireEvent.click(screen.getByText(/Submit/));

  fireEvent.click(screen.getByText(/View Questions/));

  expect(await screen.findByText(/Test Prompt/g)).toBeInTheDocument();
  expect(await screen.findByText(/lorem testum 1/g)).toBeInTheDocument();
});

test("deletes the question when the delete button is clicked", async () => {
  render(<App />);

  fireEvent.click(screen.getByText(/View Questions/));

  await screen.findByText(/lorem testum 1/g);

  fireEvent.click(screen.getAllByText(/Delete/)[0]);

  await waitFor(() => expect(screen.queryByText(/lorem testum 1/g)).not.toBeInTheDocument());

  await screen.findByText(/lorem testum 2/g);
});

test("updates the answer when the dropdown is changed", async () => {
  render(<App />);

  fireEvent.click(screen.getByText(/View Questions/));

  await screen.findByText(/lorem testum 2/g);

  const dropdown = screen.getAllByLabelText(/Correct Answer Index:/)[0];
  fireEvent.change(dropdown, { target: { value: "3" } });

  expect(dropdown.value).toBe("3");
});
