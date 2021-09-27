import React, { useCallback, useContext, useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import PokeList from "./components/pokemonList/PokeList";
import LoadSpinner from "./components/UI/LoadSpinner";
import "./App.css";
import SearchList from "./components/searchList/SearchList";
import OverlayBackground from "./components/UI/OverlayBackground";
import PokeDetails from "./components/PokeDetails";
import ReactDOM from "react-dom";
import PokemonDetailContext from "./store/pokemonDetail-context";

export interface pokemonType {
  name: string;
  url: string;
  id: string;
  types: string[];
}

function App() {
  const [pokeData, setPokeData] = useState<pokemonType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const { pokemonDetail } = useContext(PokemonDetailContext);

  const fetchPokemons = useCallback(async () => {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=80&offset=0"
      );
      if (!response.ok) {
        throw new Error("Couldn't load the data.");
      }
      const { results } = await response.json();
      const resultDetails: pokemonType[] = [];
      await Promise.all(
        results.map((result: { name: string; url: string }) =>
          fetch(result.url)
        )
      )
        .then((promises) =>
          Promise.all(promises.map((promise: any) => promise.json()))
        )
        .then((pokemons) =>
          pokemons.forEach((pokemon) => {
            resultDetails.push({
              name: pokemon.name,
              id: pokemon.id,
              url: pokemon.sprites.front_default,
              types: pokemon.types.map(
                (obj: {
                  slot: number;
                  type: { name: string; url: string };
                }) => {
                  return obj.type.name;
                }
              ),
            });
          })
        );
      setPokeData(resultDetails);
    } catch (error) {
      setError("Sorry, couldn't load Pokémons. Try later.");
      console.log(error);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchPokemons();
  }, [fetchPokemons]);

  let content = null;
  if (error) {
    content = (
      <div className="App__child-wrap">
        <h1 className="App__error">{error}</h1>
      </div>
    );
  } else if (isLoading) {
    content = (
      <div className="App__child-wrap">
        <LoadSpinner />
      </div>
    );
  } else {
    content = <PokeList pokeData={pokeData} />;
  }

  let pokeDetail = null;
  if (pokemonDetail.name) {
    pokeDetail = [
      ReactDOM.createPortal(
        <OverlayBackground />,
        document.getElementById("overlay-background")!
      ),
      ReactDOM.createPortal(
        <PokeDetails />,
        document.getElementById("overlay-root")!
      ),
    ];
  }

  return (
    <React.Fragment>
      <div className="App">
        <NavBar></NavBar>
        <SearchList pokeData={pokeData} />
        {content}
      </div>
      {pokeDetail}
    </React.Fragment>
  );
}

export default App;
