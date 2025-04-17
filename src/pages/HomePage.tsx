import Header from "@components/header/Header";
import { Carousel } from "@mantine/carousel";
import "./styles/homepage.scss";
import Filters from "@components/filters/Filters";
import data from "@mocks/data";
import EventsSection from "@components/eventsSection/EventsSection";
import Footer from "@components/footer/Footer";

const HomePage = () => {
  const products = data.products;
  const filters = data.filters;
  const highlightEvents = data.highlightEvents;
  console.log(products.length);
  return (
    <>
      <Header showSearchBar={true} />
      {products?.[0] && (
        <img className="highlight-product" src={products[0].image} />
      )}
      {products?.length > 1 && (
        <div className="carousel-container">
          <Carousel
            slideSize={"auto"}
            height="200"
            slideGap="0"
            align="start"
            controlsOffset="md"
            controlSize={28}
            loop
            className="products-carousel"
          >
            {products.map((product, index) => {
              if (index != 0) {
                return (
                  <Carousel.Slide key={index}>
                    <div className="carousel-slide">
                      <img src={product.image} alt={`Product ${index + 1}`} />
                    </div>
                  </Carousel.Slide>
                );
              }
            })}
          </Carousel>
        </div>
      )}
      <Filters filters={filters} />
      <EventsSection
        title="Eventi in evidenza"
        highlightEvents={highlightEvents}
      />
      <Footer />
    </>
  );
};
export default HomePage;
