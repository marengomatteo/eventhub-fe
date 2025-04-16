import Header from "@components/header/Header";
import { Carousel } from "@mantine/carousel";
import "./styles/homepage.scss";

const HomePage = () => {
  const products = [
    {
      image: "https://picsum.photos/800/300",
    },
    {
      image: "https://picsum.photos/400/300",
    },
    {
      image: "https://picsum.photos/200/500",
    },
    {
      image: "https://picsum.photos/600/300",
    },
    {
      image: "https://picsum.photos/450/300",
    },
    {
      image: "https://picsum.photos/550/300",
    },
    {
      image: "https://picsum.photos/480/300",
    },
  ];
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
    </>
  );
};
export default HomePage;
