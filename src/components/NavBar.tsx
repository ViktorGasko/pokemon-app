import styles from "./NavBar.module.css";
import CloseIcon from "@material-ui/icons/Close";
import SearchContext from "../store/search-context";
import { useContext } from "react";

const NavBar = () => {
  const { searchString, onStringChange } = useContext(SearchContext);
  const closeBtn = searchString ? (
    <button className={styles["navbar__btn--close"]}>
      <CloseIcon fontSize="medium" onClick={() => onStringChange("")} />
    </button>
  ) : null;

  return (
    <div className={styles["navbar"]}>
      <img
        src="pokemon-icon.jpg"
        alt="pokemon"
        className={styles["navbar__img"]}
      />
      <input
        className={styles["navbar__input"]}
        type="text"
        placeholder="Search for pokemon"
        value={searchString}
        onChange={(event) => {
          onStringChange(event.target.value);
        }}
      />
      {closeBtn}
    </div>
  );
};

export default NavBar;