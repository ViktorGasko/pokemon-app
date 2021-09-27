import React, { useContext } from "react";
import { pokemonType } from "../../App";
import PokemonDetailContext from "../../store/pokemonDetail-context";
import styles from "./OverlayBackground.module.css";

const OverlayBackground = () => {
  const { setPokemonDetail } = useContext(PokemonDetailContext);
  const handleClose = () => {
    setPokemonDetail({} as pokemonType);
  };
  return <div className={styles["background"]} onClick={handleClose}></div>;
};

export default OverlayBackground;
