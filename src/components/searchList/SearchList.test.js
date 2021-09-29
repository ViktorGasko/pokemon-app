import SearchContext from "../../store/search-context";
import SearchList from "./SearchList";
import { render, screen, within } from "@testing-library/react";

const pokeData = [
  { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/", id: "1" },
  { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/", id: "2" },
  { name: "venusaur", url: "https://pokeapi.co/api/v2/pokemon/3/", id: "3" },
  { name: "charmander", url: "https://pokeapi.co/api/v2/pokemon/4/", id: "4" },
];

describe("SearchList", () => {
  test("list is hidden", () => {
    let searchString = "";
    render(
      <SearchContext.Provider value={{ searchString: searchString }}>
        <SearchList pokeData={pokeData} />
      </SearchContext.Provider>
    );
    const list = screen.queryByRole("list");
    expect(list).toBeNull();
  });

  test("test list length num. 1", () => {
    let searchString = "a";
    render(
      <SearchContext.Provider value={{ searchString: searchString }}>
        <SearchList pokeData={pokeData} />
      </SearchContext.Provider>
    );
    const { getAllByRole } = within(screen.queryByRole("list"));
    const items = getAllByRole("listitem");
    expect(items.length).toBe(4);
  });

  test("test list length num. 2", () => {
    let searchString = "bulb";
    render(
      <SearchContext.Provider value={{ searchString: searchString }}>
        <SearchList pokeData={pokeData} />
      </SearchContext.Provider>
    );
    const { getAllByRole } = within(screen.queryByRole("list"));
    const items = getAllByRole("listitem");
    expect(items.length).toBe(1);
    expect(screen.getByText("bulbasaur")).toBeInTheDocument();
  });

  test("display not found text", () => {
    let searchString = "test";
    render(
      <SearchContext.Provider value={{ searchString: searchString }}>
        <SearchList pokeData={pokeData} />
      </SearchContext.Provider>
    );
    const { getAllByRole } = within(screen.queryByRole("list"));
    const items = getAllByRole("listitem");
    expect(items.length).toBe(1);
    expect(screen.getByText("No results found.")).toBeInTheDocument();
  });
});
