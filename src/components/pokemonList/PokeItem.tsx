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
        {/* onError - if sprite was not found defailt pokemon pic is used*/}
        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} 
        onError={(event: any) => {
         event.target.onerror = null;
         event.target.src = "pokemon-icon.jpg";
        }}
        alt="pokemon" className={styles["pokemon__img"]} />
      </div>
      <div className={styles["pokemon__name-wrap"]}>
        <p className={styles["pokemon__name"]}>{pokemon.name.replace(/[/-]/g," ")}</p>
      </div>
    </div>
  );
};

export default PokeItem;
