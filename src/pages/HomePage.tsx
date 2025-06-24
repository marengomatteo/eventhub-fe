import Header from "@components/header/Header";
import { Carousel } from "@mantine/carousel";
import "./styles/homepage.scss";
import Filters from "@components/filters/Filters";
import data from "@mocks/data";
import EventsSection from "@components/eventsSection/EventsSection";
import Footer from "@components/footer/Footer";
import { useEffect, useState } from "react";
import { getBaseURL } from "../utils";
import { Event } from "../utils/types";
const HomePage = () => {
  const filters = data.filters;

  const [products, setProducts] = useState<Event[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("");

  /* fetch products */
  const getProducts = () => {
    getBaseURL("event").get("/list").then((response) => {
      /* multiply response data to simulate more events */
      setProducts([...response.data, ...response.data, ...response.data, ...response.data, ...response.data]);
    });
  }
  useEffect(() => {
    getProducts();
  }, []);

  const handleFilterClick = (filter: string) => {
    setSelectedFilter((prev) => (prev === filter ? "" : filter));
  }
  return (
    <>
      <Header showSearchBar={true} />
      {products?.[0] && (
        <img className="highlight-product" src={products[0].image || "https://picsum.photos/300/200"} />
      )}
      {products?.length > 1 && (
        <div className="carousel-container">
          <Carousel
            slideSize={"auto"}
            height="200"
            slideGap="0"
            controlsOffset="md"
            controlSize={28}
            className="products-carousel"
          >
            {products.map((product, index) => {
              if (index != 0) {
                return (
                  <Carousel.Slide key={index}>
                    <div className="carousel-slide">
                      <img src={product.image || "https://picsum.photos/300/200"} alt={`Product ${index + 1}`} />
                    </div>
                  </Carousel.Slide>
                );
              }
            })}
          </Carousel>
        </div>
      )}
      <Filters filters={filters} handleFilterClick={handleFilterClick} selectedFilter={selectedFilter} />
      <EventsSection
        title="Eventi in evidenza"
        highlightEvents={selectedFilter ? products.filter((product) => product.eventType === selectedFilter) : products}
      />
      <Footer />
    </>
  );
};
export default HomePage;
