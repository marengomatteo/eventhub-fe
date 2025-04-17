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
      <Carousel
        slideSize="20%"
        loop={false}
        height={200}
        slideGap="lg"
        align="start"
        withControls={false}
      >
        {filters.map(({ name, icon }) => (
          <Carousel.Slide className="filter" key={name}>
            <div className="filter-icon">
              <img src={icon} />
            </div>
            <span>{name}</span>
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
};

export default Filters;
