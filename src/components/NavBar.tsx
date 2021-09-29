import styles from "./NavBar.module.css";
import CloseIcon from "@material-ui/icons/Close";
import SearchContext from "../store/search-context";
import React, { useContext, useState } from "react";
import ChangeSettings from "./ChangeSettings";

interface navProps {
  limit: string;
  offset: string;
  setLimit: (val: string) => void;
  setOffset: (val: string) => void;
}

const NavBar: React.FC<navProps> = (props) => {
  // because searchString was used in multiple places, its value is stored in context
  const { searchString, onStringChange } = useContext(SearchContext);
  const [settingVisible, setSettingVisible] = useState(false);

  const settingVisibleHandler = () => {
    setSettingVisible(!settingVisible);
  };
  // used to clear input and therefore also hide search results
  const closeBtn = searchString ? (
    <button
      className={styles["navbar__btn--close"]}
      onClick={() => onStringChange("")}
    >
      <CloseIcon fontSize="medium" />
    </button>
  ) : null;

  return (
    <React.Fragment>
      {settingVisible ? (
        <ChangeSettings {...props} setVisibility={settingVisibleHandler} />
      ) : null}
      <div className={styles["navbar"]}>
        <img
          onClick={() => settingVisibleHandler()}
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
    </React.Fragment>
  );
};

export default NavBar;
