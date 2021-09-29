import SearchContext from "../store/search-context";
import ChangeSettings from "./ChangeSettings";
import { render, screen, fireEvent } from "@testing-library/react";

describe("ChangeSettings", () => {
  test("placeholder value is shown", () => {
    let limit = "10";
    let offset = "0";
    const setLimit = jest.fn();
    const setOffset = jest.fn();
    const setVisibility = jest.fn();
    render(
      <ChangeSettings
        limit={limit}
        setLimit={setLimit}
        offset={offset}
        setOffset={setOffset}
        setVisibility={setVisibility}
      />
    );
    const input = screen.getByPlaceholderText("10");
    expect(input).toBeInTheDocument();
  });

  test("reload button clicked", () => {
    let limit = "10";
    let offset = "0";
    const setLimit = jest.fn();
    const setOffset = jest.fn();
    const setVisibility = jest.fn();
    const location = window.location;
    delete window.location;
    window.location = {
      ...location,
      reload: jest.fn(),
    };
    render(
      <ChangeSettings
        limit={limit}
        setLimit={setLimit}
        offset={offset}
        setOffset={setOffset}
        setVisibility={setVisibility}
      />
    );
    const button = screen.getByText(/reload/i);
    fireEvent.click(button);
    expect(window.location.reload).toHaveBeenCalledTimes(1);
    expect(setVisibility).toHaveBeenCalledTimes(1);
    jest.restoreAllMocks();
    window.location = location;
  });

  test("apply button is clicked", () => {
    let limit = "10";
    let offset = "0";
    const setLimit = jest.fn();
    const setOffset = jest.fn();
    const setVisibility = jest.fn();
    render(
      <ChangeSettings
        limit={limit}
        setLimit={setLimit}
        offset={offset}
        setOffset={setOffset}
        setVisibility={setVisibility}
      />
    );
    const button = screen.getByText(/apply/i);
    fireEvent.click(button);
    expect(setOffset).toHaveBeenCalledTimes(1);
    expect(setLimit).toHaveBeenCalledTimes(1);
    expect(setVisibility).toHaveBeenCalledTimes(1);
  });

  test("close button is clicked", () => {
    let limit = "10";
    let offset = "0";
    const setLimit = jest.fn();
    const setOffset = jest.fn();
    const setVisibility = jest.fn();
    render(
      <ChangeSettings
        limit={limit}
        setLimit={setLimit}
        offset={offset}
        setOffset={setOffset}
        setVisibility={setVisibility}
      />
    );
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[0]);
    expect(setOffset).toHaveBeenCalledTimes(0);
    expect(setLimit).toHaveBeenCalledTimes(0);
    expect(setVisibility).toHaveBeenCalledTimes(1);
  });
});
