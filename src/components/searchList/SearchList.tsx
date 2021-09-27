import SearchListItem from "./SearchListItem";
import styles from "./SearchList.module.css";
import { pokemonType } from "../../App";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import SearchContext from "../../store/search-context";

interface searchProps {
  pokeData: pokemonType[];
}

const SearchList: React.FC<searchProps> = ({ pokeData }) => {
  const [searchArray, setSearchArray] = useState<pokemonType[]>([]);
  const { searchString } = useContext(SearchContext);
  const prevSearchString = useRef(searchString);

  // function for searching pokemon's, executed after every searchString change,
  // prevSearchString.current !== searchString prevents from executing after searchArray change
  // results are sorted based on position of search string in pokemon's name
  const searchPokemon = useCallback(() => {
    if (prevSearchString.current !== searchString) {
      let sortArray: pokemonType[] = [];
      const sortedArray: pokemonType[] = [];
      if (searchString.length !== 0) {
        setSearchArray([]);
        if (
          sortArray.length === 0 ||
          prevSearchString.current.length > searchString.length
        ) {
          sortArray = pokeData;
        } else {
          sortArray = searchArray;
        }
        sortArray.forEach((element) => {
          if (element.name.indexOf(searchString) >= 0)
            sortedArray.push(element);
        });
        sortedArray.sort((firstEl, secondEl) =>
          firstEl.name.indexOf(searchString) >=
          secondEl.name.indexOf(searchString)
            ? 1
            : -1
        );
      }
      setSearchArray(sortedArray);
    }
    prevSearchString.current = searchString;
  }, [pokeData, searchArray, searchString]);

  useEffect(() => {
    searchPokemon();
  }, [searchPokemon]);

  return (
    <React.Fragment>
      {/* if searchString is empty SearchList exist only as empty React.Fragment */}
      {searchString ? (
        <div className={styles["search-list"]}>
          <ul>
            {searchArray.map((pokemon) => (
              <li key={pokemon.id} className={styles["search-list__li"]}>
                <SearchListItem key={pokemon.id} pokemon={pokemon} />
              </li>
            ))}
            {searchArray.length === 0 ? (
              <li className={styles["search-list__li"]}>
                <p className={styles["search-list__no-results"]}>
                  No results found.
                </p>
              </li>
            ) : null}
          </ul>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default SearchList;
