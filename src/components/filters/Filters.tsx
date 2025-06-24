import { FC } from "react";

import "./styles/index.scss";

interface FilterProps {
  filters: {
    name: string;
    icon: string;
  }[];
  selectedFilter: string;
  handleFilterClick: (filter: string) => void;
}

const Filters: FC<FilterProps> = ({ filters, handleFilterClick, selectedFilter }) => {
  return (
    <div className="filters-wrapper">
      {filters.map(({ name, icon }) => (
        <button className={selectedFilter === name ? "filter selected" : "filter"} key={name} onClick={() => handleFilterClick(name)}>
          <div className="filter-icon">
            <img src={icon} />
          </div>
          <span>{name}</span>
        </button>
      ))}
    </div>
  );
};

export default Filters;
