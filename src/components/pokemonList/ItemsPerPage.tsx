import React, { useEffect, useState } from "react";
import styles from "./ItemsPerPage.module.css";

interface itemsPerPageProps {
  itemsNumber: number;
  setItemsNumber: (num: number) => void;
}

const ItemsPerPage: React.FC<itemsPerPageProps> = ({
  itemsNumber,
  setItemsNumber,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  // used to show menu, in which different number of PokeItems to show can be choose
  const showMenuHandler = () => {
    if (!showMenu) {
      setShowMenu(true);
    }
  };

  // eventListener so showMenu can be change (which causes to close menu for choosing number of pokemons to show) by
  // clicking on random position in window
  useEffect(() => {
    if (!showMenu) return;
    const closeOnClick = () => {
      setShowMenu(false);
    };
    window.addEventListener("click", closeOnClick);
    return () => {
      window.removeEventListener("click", closeOnClick);
    };
  }, [showMenu]);

  return (
    <React.Fragment>
      <button onClick={showMenuHandler} className={styles["per-page-button"]}>
        {itemsNumber}
      </button>

      {showMenu ? (
        <div className={styles["per-page-menu"]}>
          {[12, 24, 48].map((num) => (
            <button
              onClick={() => setItemsNumber(num)}
              key={num}
              className={styles["per-page-menu__button"]}
            >
              {num}
            </button>
          ))}
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default ItemsPerPage;
