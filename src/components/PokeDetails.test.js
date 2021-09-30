import PokemonDetailContext from "../store/pokemonDetail-context";
import PokeDetails from "./PokeDetails";
import { render, screen, fireEvent } from "@testing-library/react";

describe("PokeDetails", () => {
  test("PokeDetails renders pokemon's description", async () => {
    // i failed so hard to create mockup async function
    // window.fetch = jest.fn()
    // window.fetch.mockResolvedValueOnce({
    //     json: async () => {flavor_text_entries: [{flavor_text: "pokemon description", language: {name: "en"}}]}
    // })
    render(
      <PokemonDetailContext.Provider
        value={{
          pokemonDetail: {
            name: "bulbasaur",
            url: "https://pokeapi.co/api/v2/pokemon/1/",
            id: "1",
          },
        }}
      >
        <PokeDetails />
      </PokemonDetailContext.Provider>
    );
    const name = await screen.findByText(
      "A strange seed was planted on its back at birth. The plant sprouts and grows with this POKéMON."
    );
    expect(name).toBeInTheDocument();
  });

  test("PokeDetails renders pokemon's types", async () => {
    render(
      <PokemonDetailContext.Provider
        value={{
          pokemonDetail: {
            name: "bulbasaur",
            url: "https://pokeapi.co/api/v2/pokemon/1/",
            id: "1",
          },
        }}
      >
        <PokeDetails />
      </PokemonDetailContext.Provider>
    );
    const type1 = await screen.findByText("grass");
    const type2 = await screen.findByText("poison");
    expect(type1).toBeInTheDocument();
    expect(type2).toBeInTheDocument();
  });

  test("PokeDetails renders description not found", async () => {
    render(
      <PokemonDetailContext.Provider
        value={{
          pokemonDetail: {
            name: "bulbasaur",
            url: "https://pokeapi.co/api/v2/pokemon/1/",
            id: "made_up_id",
          },
        }}
      >
        <PokeDetails />
      </PokemonDetailContext.Provider>
    );
    const description = await screen.findByText(
      "Sorry, this Pokémon currently doesn't have description.",
      {},
      { timeout: 8000 }
    );
    expect(description).toBeInTheDocument();
  });

  test("PokeDetails pokemon image", async () => {
    render(
      <PokemonDetailContext.Provider
        value={{
          pokemonDetail: {
            name: "bulbasaur",
            url: "https://pokeapi.co/api/v2/pokemon/1/",
            id: "1",
          },
        }}
      >
        <PokeDetails />
      </PokemonDetailContext.Provider>
    );
    const image = await screen.findByRole("img");
    expect(image).toHaveAttribute(
      "src",
      "https://img.pokemondb.net/artwork/bulbasaur.jpg"
    );
  });

  // sprite and backup image is loaded in onerror event so i couldnt make these tests run
  //   test("PokeDetails pokemon sprite", async () => {
  //     render(
  //       <PokemonDetailContext.Provider
  //         value={{
  //           pokemonDetail: {
  //             name: "made_up_name",
  //             url: "https://pokeapi.co/api/v2/pokemon/1/",
  //             id: "1",
  //           },
  //         }}
  //       >
  //         <PokeDetails />
  //       </PokemonDetailContext.Provider>
  //     );
  //     const sprite = await screen.findByRole("img", {}, { timeout: 3000 });
  //     expect(sprite).toHaveAttribute(
  //       "src",
  //       "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
  //     );
  //   });

  //   test("PokeDetails pokemon backup image", async () => {
  //     const component = render(
  //       <PokemonDetailContext.Provider
  //         value={{
  //           pokemonDetail: {
  //             name: "made_up_name",
  //             url: "https://pokeapi.co/api/v2/pokemon/made_up_url/",
  //             id: "1",
  //           },
  //         }}
  //       >
  //         <PokeDetails />
  //       </PokemonDetailContext.Provider>
  //     );
  //     const backup = await screen.findByRole("img", {}, { timeout: 3000 });
  //     expect(backup).toHaveAttribute("src", "pokemon-icon.jpg");
  //   });

  test("PokeDetails pokemon close button", async () => {
    let pokemonDetail = {
      name: "bulbasaur",
      url: "https://pokeapi.co/api/v2/pokemon/1/",
      id: "1",
    };
    const setPokemonDetail = jest.fn((val) => (pokemonDetail = val));
    const component = render(
      <PokemonDetailContext.Provider
        value={{
          pokemonDetail: pokemonDetail,
          setPokemonDetail: setPokemonDetail,
        }}
      >
        <PokeDetails />
      </PokemonDetailContext.Provider>
    );
    const button = await component.findByRole("button", {}, { timeout: 5000 });
    fireEvent.click(button);
    expect(Object.keys(pokemonDetail).length).toBe(0);
  });
});
