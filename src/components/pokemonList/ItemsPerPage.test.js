import ItemsPerPage from "./ItemsPerPage";
import { render, screen, fireEvent } from "@testing-library/react";

describe("ItemsPerPage", () => {
  test("showimg 24 items per page", () => {
    let itemsNumber = 24;
    const setItemsNumber = jest.fn((val) => (itemsNumber = val));
    render(
      <ItemsPerPage itemsNumber={itemsNumber} setItemsNumber={setItemsNumber} />
    );
    const button = screen.getByRole("button", {
      name: /24/i,
    });
    expect(button).toBeInTheDocument();
  });

  test("show items per page options", () => {
    let itemsNumber = 24;
    const setItemsNumber = jest.fn((val) => (itemsNumber = val));
    render(
      <ItemsPerPage itemsNumber={itemsNumber} setItemsNumber={setItemsNumber} />
    );
    const button = screen.getByRole("button", {
      name: /24/i,
    });
    fireEvent.click(button);
    const buttons24 = screen.getAllByRole("button", {
      name: /24/i,
    });
    const buttons12 = screen.getAllByRole("button", {
      name: /12/i,
    });
    const buttons48 = screen.getAllByRole("button", {
      name: /48/i,
    });
    expect(buttons12.length).toBe(1);
    expect(buttons24.length).toBe(2);
    expect(buttons48.length).toBe(1);
  });

  test("choose items per page option", () => {
    let itemsNumber = 24;
    const setItemsNumber = jest.fn((val) => (itemsNumber = val));
    render(
      <ItemsPerPage itemsNumber={itemsNumber} setItemsNumber={setItemsNumber} />
    );
    const button = screen.getByRole("button", {
      name: /24/i,
    });
    fireEvent.click(button);
    const buttons12 = screen.getByRole("button", {
      name: /12/i,
    });
    fireEvent.click(buttons12);
    expect(itemsNumber).toBe(12);
  });

  test("close items per page menu option 1", () => {
    let itemsNumber = 24;
    const setItemsNumber = jest.fn((val) => (itemsNumber = val));
    render(
      <ItemsPerPage itemsNumber={itemsNumber} setItemsNumber={setItemsNumber} />
    );
    const button = screen.getByRole("button", {
      name: /24/i,
    });
    fireEvent.click(button);
    const buttons12 = screen.getByRole("button", {
      name: /12/i,
    });
    fireEvent.click(buttons12);
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBe(1);
  });

  test("close items per page menu option 2", () => {
    let itemsNumber = 24;
    const setItemsNumber = jest.fn((val) => (itemsNumber = val));
    render(
      <ItemsPerPage itemsNumber={itemsNumber} setItemsNumber={setItemsNumber} />
    );
    const button = screen.getByRole("button", {
      name: /24/i,
    });
    fireEvent.click(button);
    fireEvent.click(button);
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBe(1);
  });
});
