import React, { useContext } from "react";
import { pokemonType } from "../../App";
import PokemonDetailContext from "../../store/pokemonDetail-context";
import styles from "./PokeItem.module.css";

interface pokeProps {
  pokemon: pokemonType;
}

const PokeItem: React.FC<pokeProps> = ({ pokemon }) => {
  const { setPokemonDetail } = useContext(PokemonDetailContext);

  // after clicking on PokeItem pokemonDetail in pokemonDetail-context is set and
  // PokeDetail is rendered
  const handleShowDetails = () => {
    setPokemonDetail(pokemon);
  };

  return (
    <div className={styles["pokemon"]} onClick={() => handleShowDetails()}>
      <div className={styles["pokemon__img-wrap"]}>
        <img src={pokemon.url ? pokemon.url : "pokemon-icon.jpg"} alt="pokemon" className={styles["pokemon__img"]} />
      </div>
      <div className={styles["pokemon__name-wrap"]}>
        <p className={styles["pokemon__name"]}>{pokemon.name}</p>
      </div>
    </div>
  );
};

export default PokeItem;
