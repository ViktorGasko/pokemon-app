import SearchContext from "../../store/search-context";
import PokemonDetailContext from "../../store/pokemonDetail-context";
import SearchListItem from "./SearchListItem";
import { render, screen, fireEvent } from "@testing-library/react";

const pokeData = {
  name: "bulbasaur",
  url: "https://pokeapi.co/api/v2/pokemon/1/",
  id: "1",
};

describe("SearchListItem", () => {
  test("show name", () => {
    let searchString = "";
    let pokemon = {};
    const onStringChange = jest.fn((val) => (searchString = val));
    const setPokemonDetail = jest.fn((val) => (pokemon = val));
    render(
      <SearchContext.Provider value={{ onStringChange: onStringChange }}>
        <PokemonDetailContext.Provider
          value={{ setPokemonDetail: setPokemonDetail }}
        >
          <SearchListItem pokemon={pokeData} />
        </PokemonDetailContext.Provider>
      </SearchContext.Provider>
    );
    const el = screen.getByText(/bulbasaur/i);
    expect(el).toBeInTheDocument();
  });

  test("show image", () => {
    let searchString = "";
    let pokemon = {};
    const onStringChange = jest.fn((val) => (searchString = val));
    const setPokemonDetail = jest.fn((val) => (pokemon = val));
    render(
      <SearchContext.Provider value={{ onStringChange: onStringChange }}>
        <PokemonDetailContext.Provider
          value={{ setPokemonDetail: setPokemonDetail }}
        >
          <SearchListItem pokemon={pokeData} />
        </PokemonDetailContext.Provider>
      </SearchContext.Provider>
    );
    const sprite = screen.getByRole("img");
    expect(sprite).toHaveAttribute(
      "src",
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
    );
  });

  test("click on item", () => {
    let searchString = "bul";
    let pokemon = { name: "", url: "", id: "" };
    const onStringChange = jest.fn((val) => (searchString = val));
    const setPokemonDetail = jest.fn((val) => (pokemon = val));
    render(
      <SearchContext.Provider value={{ onStringChange: onStringChange }}>
        <PokemonDetailContext.Provider
          value={{ setPokemonDetail: setPokemonDetail }}
        >
          <SearchListItem pokemon={pokeData} />
        </PokemonDetailContext.Provider>
      </SearchContext.Provider>
    );
    fireEvent.click(screen.getByText(/bulbasaur/i));
    expect(searchString).toBe("");
    expect(pokemon.name).toBe("bulbasaur");
  });
});
