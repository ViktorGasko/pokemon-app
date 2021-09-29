import PokeListPageNav from "./PokeListPageNav";
import { render, screen, fireEvent } from "@testing-library/react";

describe("PokeListPageNav", () => {
  test("change page from 1 to 2", () => {
    let currentPage = 1;
    let totalPageNumber = 3;
    let itemsNumber = 24;
    const setItemsNumber = jest.fn();
    const onPageChange = jest.fn((val) => (currentPage = val));
    render(
      <PokeListPageNav
        currentPage={currentPage}
        totalPageNumber={totalPageNumber}
        itemsNumber={itemsNumber}
        setItemsNumber={setItemsNumber}
        onPageChange={onPageChange}
      />
    );
    const button = screen.getByRole("button", {
      name: /^2$/i,
    });
    fireEvent.click(button);
    expect(currentPage).toBe(2);
  });

  test("page numbers 1 2 3 should be shown", () => {
    let currentPage = 1;
    let totalPageNumber = 3;
    let itemsNumber = 24;
    const setItemsNumber = jest.fn();
    const onPageChange = jest.fn((val) => (currentPage = val));
    render(
      <PokeListPageNav
        currentPage={currentPage}
        totalPageNumber={totalPageNumber}
        itemsNumber={itemsNumber}
        setItemsNumber={setItemsNumber}
        onPageChange={onPageChange}
      />
    );
    const buttons = screen.getAllByRole("button", {
      name: /^[123]$/i,
    });
    let i = 0;
    buttons.forEach((button) => {
      i++;
      expect(button).toHaveTextContent(i.toString());
    });
    expect(i).toBe(3);
  });

  test("page numbers 3 4 5 6 7 should be shown", () => {
    let currentPage = 6;
    let totalPageNumber = 7;
    let itemsNumber = 24;
    const setItemsNumber = jest.fn();
    const onPageChange = jest.fn((val) => (currentPage = val));
    render(
      <PokeListPageNav
        currentPage={currentPage}
        totalPageNumber={totalPageNumber}
        itemsNumber={itemsNumber}
        setItemsNumber={setItemsNumber}
        onPageChange={onPageChange}
      />
    );
    const buttons = screen.getAllByRole("button", {
      name: /^[34567]$/i,
    });
    let i = 2;
    buttons.forEach((button) => {
      i++;
      expect(button).toHaveTextContent(i.toString());
    });
    expect(i).toBe(7);
  });
});
