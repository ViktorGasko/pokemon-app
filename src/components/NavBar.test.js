import SearchContext from "../store/search-context";
import NavBar from "./NavBar";
import { render, screen, fireEvent } from "@testing-library/react";

describe("NavBar", () => {
  test("searchString value is passsed to input", () => {
    let searchString = "test";
    const onStringChange = jest.fn((val) => (searchString = val));
    render(
      <SearchContext.Provider
        value={{ searchString: searchString, onStringChange: onStringChange }}
      >
        <NavBar />
      </SearchContext.Provider>
    );
    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("test");
  });

  test("empty searchString causes button to be hidden", () => {
    let searchString = "";
    const onStringChange = jest.fn((val) => (searchString = val));
    render(
      <SearchContext.Provider
        value={{ searchString: searchString, onStringChange: onStringChange }}
      >
        <NavBar />
      </SearchContext.Provider>
    );
    expect(screen.queryByRole("button")).toBeNull();
  });

  test("searchString causes button to be shown", () => {
    let searchString = "test";
    const onStringChange = jest.fn((val) => (searchString = val));
    render(
      <SearchContext.Provider
        value={{ searchString: searchString, onStringChange: onStringChange }}
      >
        <NavBar />
      </SearchContext.Provider>
    );
    expect(screen.queryByRole("button")).toBeInTheDocument();
  });

  test("check if changeSettings render", () => {
    let searchString = "test";
    const onStringChange = jest.fn((val) => (searchString = val));
    render(
      <SearchContext.Provider
        value={{ searchString: searchString, onStringChange: onStringChange }}
      >
        <NavBar />
      </SearchContext.Provider>
    );
    const img = screen.getByRole("img");
    fireEvent.click(img);
    expect(screen.getByText(/from/i)).toBeInTheDocument();
  });

  test("search clear works", async () => {
    let searchString = "test";
    const onStringChange = jest.fn((val) => (searchString = val));
    const { getByRole } = render(
      <SearchContext.Provider
        value={{ searchString: searchString, onStringChange: onStringChange }}
      >
        <NavBar />
      </SearchContext.Provider>
    );
    const button = getByRole("button");
    fireEvent.click(button);
    expect(searchString).toBe("");
  });
});
