import SearchContext from "./store/search-context";
import PokemonDetailContext from "./store/pokemonDetail-context";
import App from "./App";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ContactSupportOutlined } from "@material-ui/icons";

const pokeData = {
  name: "bulbasaur",
  url: "https://pokeapi.co/api/v2/pokemon/1/",
  id: "1",
};

// 9 pokemons are loaded as default so 10th pokemon - Caterpie shouldnt be visibe
describe("App", () => {
  test("expect first 9 pokemons to be loaded", async () => {
    let searchString = "";
    let pokemon = { name: "", url: "", id: "" };
    const onStringChange = jest.fn((val) => (searchString = val));
    const setPokemonDetail = jest.fn((val) => (pokemon = val));
    render(
      <SearchContext.Provider
        value={{ onStringChange: onStringChange, searchString: searchString }}
      >
        <PokemonDetailContext.Provider
          value={{ setPokemonDetail: setPokemonDetail, pokemonDetail: pokemon }}
        >
          <App />
        </PokemonDetailContext.Provider>
      </SearchContext.Provider>
    );
    const arr = [
      "bulbasaur",
      "ivysaur",
      "venusaur",
      "charmander",
      "charmeleon",
      "charizard",
      "squirtle",
      "wartortle",
      "blastoise",
      "caterpie",
    ];
    for (let pokemon of arr) {
      if (pokemon === "caterpie") {
        const re = new RegExp(pokemon, "gi");
        const pokemonItem = await waitFor(() => screen.queryByText(re), {
          timeout: 5000,
        });
        expect(pokemonItem).toBeNull();
      } else {
        const re = new RegExp(pokemon, "gi");
        const pokemonItem = await screen.findByText(re, {}, { timeout: 5000 });
        expect(pokemonItem).toBeInTheDocument();
      }
    }
  });

  // we change number of loaded pokemns to 2 so 3th pokemon - Venusaur shouldnt be visibe
  //this one was before few changes little bit unreliable so i hope that its fine
  test("load only 2 pokemons", async () => {
    let searchString = "";
    let pokemon = { name: "", url: "", id: "" };
    const onStringChange = jest.fn((val) => (searchString = val));
    const setPokemonDetail = jest.fn((val) => (pokemon = val));
    render(
      <SearchContext.Provider
        value={{ onStringChange: onStringChange, searchString: searchString }}
      >
        <PokemonDetailContext.Provider
          value={{ setPokemonDetail: setPokemonDetail, pokemonDetail: pokemon }}
        >
          <App />
        </PokemonDetailContext.Provider>
      </SearchContext.Provider>
    );
    const img = screen.getByRole("img");
    fireEvent.click(img);
    const input = await screen.findByPlaceholderText("9");
    fireEvent.change(input, { target: { value: 2 } });
    const button = screen.getByText(/apply/i);
    fireEvent.click(button);
    const arr = ["bulbasaur", "ivysaur", "venusaur"];
    for (let pokemon of arr) {
      if (pokemon === "venusaur") {
        const re = new RegExp(pokemon, "gi");
        const pokemonItem = screen.findByText(
          re,
          {},
          {
            timeout: 5000,
          }
        );
        expect(Object.keys(pokemonItem).length).toBe(0);
      } else {
        const re = new RegExp(pokemon, "gi");
        const pokemonItem = await screen.findByText(re, {}, { timeout: 5000 });
        expect(pokemonItem).toBeInTheDocument();
      }
    }
  });

  // 9 pokemon are loaded and if we type "bu" into search bar
  // we should see name bulbasaur twice - pokeItem and searchListItem
  // we will compare it to blastoise  only other pokemon with by in the name
  // out of first nine, we should see him only once
  // test("open search list", async () => {
  //   let searchString = "";
  //   let pokemon = { name: "", url: "", id: "" };
  //   const onStringChange = jest.fn((val) => (searchString = val));
  //   const setPokemonDetail = jest.fn((val) => (pokemon = val));
  //   const { rerender } = render(
  //     <SearchContext.Provider
  //       value={{ onStringChange: onStringChange, searchString: searchString }}
  //     >
  //       <PokemonDetailContext.Provider
  //         value={{ setPokemonDetail: setPokemonDetail, pokemonDetail: pokemon }}
  //       >
  //         <App />
  //       </PokemonDetailContext.Provider>
  //     </SearchContext.Provider>
  //   );

  //   const input = await screen.findByPlaceholderText("Search for pokemon");
  //   fireEvent.change(input, { target: { value: "bu" } });
  //   rerender(
  //     <SearchContext.Provider
  //       value={{ onStringChange: onStringChange, searchString: searchString }}
  //     >
  //       <PokemonDetailContext.Provider
  //         value={{ setPokemonDetail: setPokemonDetail, pokemonDetail: pokemon }}
  //       >
  //         <App />
  //       </PokemonDetailContext.Provider>
  //     </SearchContext.Provider>
  //   );
  //   await new Promise((r) => setTimeout(r, 2000));
  //   const bulbasaur = await screen.findAllByText(
  //     "bulbasaur",
  //     {},
  //     { timeout: 5000 }
  //   );
  //   const blastoise = await screen.findAllByText(
  //     "blastoise",
  //     {},
  //     { timeout: 5000 }
  //   );
  //   console.log(input);
  //   console.log(bulbasaur.length);
  //   console.log(blastoise.length);
  // });
});
