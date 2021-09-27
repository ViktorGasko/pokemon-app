import React, { useState } from "react";
import { pokemonType } from "../App";

const PokemonDetailContext = React.createContext({
  pokemonDetail: {} as pokemonType,
  setPokemonDetail: (value: pokemonType) => {},
});

export const PokemonDetailContextProvider = (props: any) => {
  const [pokemonDetail, setPokemonDetail] = useState<pokemonType>(
    {} as pokemonType
  );

  const pokemonDetailHandler = (value: pokemonType) => {
    setPokemonDetail(value);
  };
  return (
    <PokemonDetailContext.Provider
      value={{
        pokemonDetail: pokemonDetail,
        setPokemonDetail: pokemonDetailHandler,
      }}
    >
      {props.children}
    </PokemonDetailContext.Provider>
  );
};

export default PokemonDetailContext;
