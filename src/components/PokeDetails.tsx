import React, { useCallback, useContext, useEffect, useState } from "react";
import { pokemonType } from "../App";
import styles from "./PokeDetails.module.css";
import CloseIcon from "@material-ui/icons/Close";
import LoadSpinner from "./UI/LoadSpinner";
import PokemonDetailContext from "../store/pokemonDetail-context";

interface extendedPokemon extends pokemonType {
  description: string;
  externalPic: string;
}

const PokeDetails = () => {
  const { pokemonDetail, setPokemonDetail } = useContext(PokemonDetailContext);
  const [pokeData, setPokeData] = useState<extendedPokemon>({
    ...pokemonDetail,
    description: "",
    externalPic: `https://img.pokemondb.net/artwork/${pokemonDetail.name}.jpg`,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const handleClose = () => {
    setPokemonDetail({} as pokemonType);
  };

  const fetchPokemon = useCallback(async () => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${pokemonDetail.id}/`
      );
      if (!response.ok) {
        throw new Error("Couldn't load the data.");
      }
      const { flavor_text_entries } = await response.json();
      let description: string;
      flavor_text_entries.some((entry: any) => {
        if (entry.language.name === "en") {
          description = entry.flavor_text.replace(/[/\f/\n]/g, " ");
          return true;
        }
        return false;
      });
      setPokeData((prevState) => ({
        ...prevState,
        description: description,
      }));
    } catch (error) {
      setError("Sorry, this Pokémon currently doesn't have description.");
      console.log(error);
    }
    setIsLoading(false);
  }, [pokemonDetail.id]);

  useEffect(() => {
    fetchPokemon();
  }, [fetchPokemon]);

  let content;
  if (isLoading) {
    content = <LoadSpinner />;
  } else {
    content = (
      <React.Fragment>
        <button
          onClick={handleClose}
          className={styles["poke-detail__btn--close"]}
        >
          <CloseIcon fontSize="large" />
        </button>
        <div className={styles["poke-detail__img-wrap"]}>
          <img
            className={styles["poke-detail__img"]}
            src={pokeData.externalPic}
            alt="pokemon"
            onError={(event: any) => {
              event.target.onerror = null;
              event.target.src = pokeData.url;
            }}
          />
        </div>
        <h1 className={styles["poke-detail__name"]}>{pokeData.name}</h1>
        <h3 className={styles["poke-detail__description"]}>
          <i>{error ? error : pokeData.description}</i>
        </h3>
        <div className={styles["poke-detail__types-wrap"]}>
          {pokeData.types.map((type) => (
            <p
              className={[
                styles["pokemon-types"],
                styles[`pokemon-type--${type}`],
              ].join(" ")}
              key={type}
            >
              {type}
            </p>
          ))}
        </div>
      </React.Fragment>
    );
  }

  return <div className={styles["poke-detail"]}>{content}</div>;
};

export default PokeDetails;
