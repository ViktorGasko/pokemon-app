import styles from "./SearchListItem.module.css";
import { pokemonType } from "../../App";
import React, { useContext } from "react";
import SearchContext from "../../store/search-context";
import PokemonDetailContext from "../../store/pokemonDetail-context";

interface pokeProps {
  pokemon: pokemonType;
}
// element in Search list - pokemon's name and sprite
const SearchListItem: React.FC<pokeProps> = ({ pokemon }) => {
  const { onStringChange } = useContext(SearchContext);
  const { setPokemonDetail } = useContext(PokemonDetailContext);

  // after clicking on pokemon in SearchList, pokemonDetail in pokemonDetail-context is set,
  // therefore PokeDetail is rendered, and searchString is set to "", therefore, SearchList is closed
  const handleShowDetails = () => {
    setPokemonDetail(pokemon);
    onStringChange("");
  };

  return (
    <div
      className={styles["search-list-item"]}
      onClick={() => handleShowDetails()}
    >
      <div className={styles["search-list-item__img-wrap"]}>
        <img
          src={pokemon.url}
          alt="pokemon"
          className={styles["search-list-item__img"]}
        />
      </div>
      <p className={styles["search-list-item__name"]}>{pokemon.name}</p>
    </div>
  );
};

export default SearchListItem;
