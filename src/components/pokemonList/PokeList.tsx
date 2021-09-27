import styles from "./PokeList.module.css";
import { pokemonType } from "../../App";
import PokeListPage from "./PokeListPage";
import PokeListPageNav from "./PokeListPageNav";
import { useCallback, useEffect, useState } from "react";

interface pokeProps {
  pokeData: pokemonType[];
}

const PokeList: React.FC<pokeProps> = ({ pokeData }) => {
  const [itemsNumber, setItemsNumber] = useState(24);
  const [totalPageNumber, setTotalPageNumber] = useState(1);
  const [pageData, setPageData] = useState<pokemonType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

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

  const pageDataHandler = useCallback(() => {
    setPageData(
      pokeData.slice((currentPage - 1) * itemsNumber, currentPage * itemsNumber)
    );
  }, [currentPage, pokeData, itemsNumber]);

  const currentPageHandler = (page: number) => {
    setCurrentPage(page);
  };

  const itemsNumberHandler = (number: number) => {
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
