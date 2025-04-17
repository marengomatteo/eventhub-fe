import { FC } from "react";

import "./styles/index.scss";
import { Carousel } from "@mantine/carousel";
interface FilterProps {
  filters: {
    name: string;
    icon: string;
  }[];
}

const Filters: FC<FilterProps> = ({ filters }) => {
  return (
    <div className="filters-wrapper">
      {filters.map(({ name, icon }) => (
        <div className="filter" key={name}>
          <div className="filter-icon">
            <img src={icon} />
          </div>
          <span>{name}</span>
        </div>
      ))}
    </div>
  );
};

export default Filters;
