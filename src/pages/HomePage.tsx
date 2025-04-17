import Header from "@components/header/Header";
import { Carousel } from "@mantine/carousel";
import "./styles/homepage.scss";
import Filters from "@components/filters/Filters";
import { filters, products } from "@mocks/data";

const HomePage = () => {
  console.log(products);
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
            {products.splice(1).map((product, index) => (
              <Carousel.Slide key={index}>
                <div className="carousel-slide">
                  <img src={product.image} alt={`Product ${index + 1}`} />
                </div>
              </Carousel.Slide>
            ))}
          </Carousel>
        </div>
      )}
      <Filters filters={filters} />
    </>
  );
};
export default HomePage;
