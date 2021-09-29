import { useState } from "react";
import styles from "./ChangeSettings.module.css";
import CloseIcon from "@material-ui/icons/Close";

interface changeSettingProps {
  limit: string;
  offset: string;
  setLimit: (val: string) => void;
  setOffset: (val: string) => void;
  setVisibility: () => void;
}

const ChangeSettings: React.FC<changeSettingProps> = ({
  limit,
  offset,
  setLimit,
  setOffset,
  setVisibility,
}) => {
  const [localLimit, setLocalLimit] = useState(limit);
  const [localOffset, setLocalOffset] = useState(offset);

  // changes limit and offset, which changes number of pokemons a pokemons themself
  // setting are changed when from value is smaller than to
  // (offset is from and to if limit + offset) =>
  // (parseInt(tempLimit) + parseInt(tempOffset) > parseInt(tempOffset))
  //when localOffset or localLimit is empty (after typing and clearing input)
  // tempOffset/Limit is set to props offset/limit
  const handleSubmit = (event: any) => {
    event.preventDefault();
    let tempOffset = localOffset;
    let tempLimit = localLimit;
    if (tempOffset === "") {
      tempOffset = offset;
    }
    if (tempLimit === "") {
      tempLimit = limit;
    }
    if (parseInt(tempLimit) + parseInt(tempOffset) > parseInt(tempOffset)) {
      setLimit(tempLimit);
      setOffset(tempOffset);
    }
    setVisibility();
  };

  const localLimitHandler = (val: string) => {
    setLocalLimit((parseInt(val) - parseInt(localOffset)).toString());
  };

  const localOffsetHandler = (val: string) => {
    setLocalOffset(val);
  };

  const reloadHandler = (event: any) => {
    event.preventDefault();
    setVisibility();
    window.location.reload();
  };

  return (
    <div className={styles["settings"]}>
      <button
        onClick={setVisibility}
        className={styles["settings__btn--close"]}
      >
        <CloseIcon fontSize="medium" />
      </button>
      <form onSubmit={handleSubmit}>
        <label className={styles["settings__label"]}>
          from
          <input
            type="number"
            id="offset"
            min="0"
            max="1118"
            placeholder={offset}
            className={styles["settings__input"]}
            onChange={(event) => {
              localOffsetHandler(event.target.value);
            }}
          />
        </label>
        <label className={styles["settings__label"]}>
          to
          <input
            type="number"
            id="limit"
            min="0"
            max="1118"
            placeholder={(parseInt(limit) + parseInt(offset)).toString()}
            className={styles["settings__input"]}
            onChange={(event) => {
              localLimitHandler(event.target.value);
            }}
          />
        </label>
        <button className={styles["settings__btn"]} onClick={reloadHandler}>
          Reload
        </button>
        <input
          type="submit"
          value="Apply"
          className={[
            styles["settings__btn"],
            styles["settings__btn--submit"],
          ].join(" ")}
        />
      </form>
    </div>
  );
};

export default ChangeSettings;
