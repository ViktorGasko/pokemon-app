import React from "react";
import { useCallback, useEffect, useState } from "react";
import styles from "./PokeListPageNav.module.css";
import ItemsPerPage from "./ItemsPerPage";

interface pageNavProps {
  currentPage: number;
  totalPageNumber: number;
  itemsNumber: number;
  setItemsNumber: (num: number) => void;
  onPageChange: (num: number) => void;
}
const PokeListPageNav: React.FC<pageNavProps> = ({
  currentPage,
  totalPageNumber,
  itemsNumber,
  setItemsNumber,
  onPageChange,
}) => {
  const [pageNavArray, setPageNavArray] = useState<number[]>([]);

  const pageNavArrayHandler = useCallback(() => {
    const navArr = [currentPage];
    let i: number = 1;
    while (navArr.length < 5) {
      if (navArr[0] > 1) {
        navArr.unshift(currentPage - i);
      }
      if (navArr[navArr.length - 1] < totalPageNumber) {
        navArr.push(currentPage + i);
      }
      if (i > 5) {
        break;
      }
      i++;
    }
    setPageNavArray(navArr);
  }, [currentPage, totalPageNumber]);

  useEffect(() => {
    pageNavArrayHandler();
  }, [pageNavArrayHandler]);

  return (
    <React.Fragment>
      <div className={styles["page-nav"]}>
        {pageNavArray.map((num) => (
          <button
            onClick={() => onPageChange(num)}
            key={num}
            className={[
              styles["page-nav__button"],
              num === currentPage ? styles["page-nav__button--active"] : "",
            ].join(" ")}
          >
            {num}
          </button>
        ))}
      </div>
      <div className={styles["page-nav-amount"]}>
        <ItemsPerPage
          itemsNumber={itemsNumber}
          setItemsNumber={setItemsNumber}
        />
        Pokemons per page.
      </div>
    </React.Fragment>
  );
};

export default PokeListPageNav;
