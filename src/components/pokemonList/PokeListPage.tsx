import PokeItem from "./PokeItem";
import styles from "./PokeListPage.module.css";
import { pokemonType } from "../../App";

interface pokeProps {
  pokeData: pokemonType[];
}
// used to render PokeItems - get data based on currentPage in PokeList
const PokeListPage: React.FC<pokeProps> = ({ pokeData }) => {
  return (
    <div className={styles["poke-page"]}>
      {pokeData.map((pokemon) => (
        <PokeItem key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
};

export default PokeListPage;
