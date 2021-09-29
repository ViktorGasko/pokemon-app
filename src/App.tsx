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
}

function App() {
  const [pokeData, setPokeData] = useState<pokemonType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const { pokemonDetail } = useContext(PokemonDetailContext);
  // passed as props through NavBar to ChangeSettings
  const [limit, setLimit] = useState<string>("9");
  const [offset, setOffset] = useState<string>("0");

  const limitHandler = (val: string) => {
    setLimit(val);
  };

  const offsetHandler = (val: string) => {
    setOffset(val);
  };

  //Called during initial render or after change of limit or offset, results contain objects of type
  // {name:string , url:string}, pokemon's id is obtained from url
  // pokemons are stored in pokeData ... store lets say 1000 could be a problem but every pokemon
  // contains only relatively short strings
  const fetchPokemons = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
      );
      if (!response.ok) {
        throw new Error("Couldn't load the data.");
      }
      const { results } = await response.json();
      const resultDetails: pokemonType[] = [];
      results.forEach((result: { name: string; url: string }) => {
        const parts = result.url.split("/");
        const id = parts[parts.length - 2];
        resultDetails.push({
          url: result.url,
          name: result.name,
          id: id,
        });
      });
      setPokeData(resultDetails);
    } catch (error) {
      setError("Sorry, couldn't load Pokémons. Try later.");
      console.log(error);
    }
    setIsLoading(false);
  }, [limit, offset]);

  useEffect(() => {
    fetchPokemons();
  }, [fetchPokemons]);

  //error is rendered if there was error during executing of fetchPokemons(),
  // loadSpinner is rendered during executing of fetchPokemons(),
  // PokeList is rendered if fetchPokemons() was executed sucessfully
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

  //if value pokeDetail from pokemon-Detail-context contains a pokemon ,
  // PokeDetail is rendered in separate root-div using Portal
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
        <div className="nav-height-clone"></div>
        <NavBar
          limit={limit}
          offset={offset}
          setLimit={limitHandler}
          setOffset={offsetHandler}
        ></NavBar>
        <SearchList pokeData={pokeData} />
        {content}
      </div>
      {pokeDetail}
    </React.Fragment>
  );
}

export default App;
