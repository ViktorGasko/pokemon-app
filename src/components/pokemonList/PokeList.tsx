import styles from "./PokeList.module.css";
import { pokemonType } from "../../App";
import PokeListPage from "./PokeListPage";
import PokeListPageNav from "./PokeListPageNav";
import { useCallback, useEffect, useState } from "react";

interface pokeProps {
  pokeData: pokemonType[];
}

const PokeList: React.FC<pokeProps> = ({ pokeData }) => {
  // itemsNumber used to shown certain number of PokeItems (default 24)
  const [itemsNumber, setItemsNumber] = useState(24);
  const [totalPageNumber, setTotalPageNumber] = useState(1);
  const [pageData, setPageData] = useState<pokemonType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  //executed during initial render and when number of shown pokemon is changed
  const totalPageNumHandler = useCallback(() => {
    let totalPageNum;
    const totalLength = pokeData.length;
    if (totalLength % itemsNumber === 0) {
      totalPageNum = Math.floor(totalLength / itemsNumber);
    } else {
      totalPageNum = Math.floor(totalLength / itemsNumber) + 1;
    }
    setTotalPageNumber(totalPageNum);
  }, [itemsNumber, pokeData]);

  // used to slice PokeData from props -> only certain number of pokemons in render at once
  // pokemons are rendered basen on currentPage and itemsNumber - number of pokemons to shown at once
  // executed after page change or itemsNumber change
  const pageDataHandler = useCallback(() => {
    setPageData(
      pokeData.slice((currentPage - 1) * itemsNumber, currentPage * itemsNumber)
    );
  }, [currentPage, pokeData, itemsNumber]);

  // used to change page, passed as prop PokeListPageNav where it can be called after
  // click on page number, window.scrollTo(0, 0) used to scroll to top after pagechange
  const currentPageHandler = (page: number) => {
    window.scrollTo(0, 0);
    setCurrentPage(page);
  };
  // used to change amount of shown items, passed as prop PokeListPageNav and then to ItemsPerPage
  // where it can be called, inside function currentPage is also changed, so we are on approximately
  // same position in pokeData - we can see at least few of the same pokemons,
  //window.scrollTo(0, 0); used to scroll to top
  const itemsNumberHandler = (number: number) => {
    if (number - itemsNumber === 24 || number - itemsNumber === 12) {
      if (currentPage % 2 === 0) {
        setCurrentPage(currentPage / 2);
      } else {
        setCurrentPage(Math.floor(currentPage / 2) + 1);
      }
    } else if (number - itemsNumber === 36) {
      if (currentPage % 4 === 0) {
        setCurrentPage(currentPage / 4);
      } else {
        setCurrentPage(Math.floor(currentPage / 4) + 1);
      }
    } else if (number - itemsNumber === -24 || number - itemsNumber === -12) {
      setCurrentPage(currentPage * 2 - 1);
    } else if (number - itemsNumber === -36) {
      setCurrentPage(currentPage * 4 - 3);
    }
    if (number !== itemsNumber) {
      window.scrollTo(0, 0);
    }
    setItemsNumber(number);
  };

  useEffect(() => {
    totalPageNumHandler();
  }, [totalPageNumHandler]);

  useEffect(() => {
    pageDataHandler();
  }, [pageDataHandler, currentPage]);

  return (
    <div className={styles["poke-list"]}>
      <PokeListPage pokeData={pageData} />
      <PokeListPageNav
        currentPage={currentPage}
        onPageChange={currentPageHandler}
        totalPageNumber={totalPageNumber}
        itemsNumber={itemsNumber}
        setItemsNumber={itemsNumberHandler}
      />
    </div>
  );
};

export default PokeList;
