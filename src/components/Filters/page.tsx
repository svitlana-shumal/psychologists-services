import { useState } from "react";
import type { SortOption } from "../../types/PsychologistsType";
import css from "./Filters.module.css";

type Props = {
  selected: SortOption;
  onChange: (value: SortOption) => void;
};

export default function SortDropdown({ selected, onChange }: Props) {
  const sortOptions = [
    { label: "A to Z", value: "a-z" },
    { label: "Z to A", value: "z-a" },
    { label: "Less than 10$", value: "price-low" },
    { label: "Greater than 10$", value: "price-high" },
    { label: "Popular", value: "rating-high" },
    { label: "Not popular", value: "rating-low" },
    { label: "Show all", value: "" },
  ];

  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const toggleFilter = () => {
    setIsOpenFilter((prev) => !prev);
  };

  const getLabel = (value: SortOption) => {
    const found = sortOptions.find((option) => option.value === value);
    return found?.label || "Filters";
  };

  return (
    <div className={css.dropdown}>
      <p className={css.nameFilter}>Filters</p>
      <button
        className={css.trigger}
        onClick={toggleFilter}
        aria-label="Toggle filter menu"
      >
        {getLabel(selected)}
        <svg width="20" height="20" className={css.iconRow}>
          <use
            href={`/symbol-defs.svg#${
              isOpenFilter ? "icon-down" : "icon-down-up"
            }`}
          />
        </svg>
      </button>
      {isOpenFilter && (
        <ul className={css.menu}>
          {sortOptions.map((option) => (
            <li key={option.value}>
              <button
                className={`${css.item} ${
                  selected === option.value ? css.active : ""
                }`}
                onClick={() => {
                  onChange(option.value as SortOption);
                  setIsOpenFilter(false);
                }}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
