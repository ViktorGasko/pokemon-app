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
  const showMenuHandler = () => {
    if (!showMenu) {
      setShowMenu(true);
    }
  };

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
