import ProductsCarousel from "./ProductsCarousel";
import image1 from "../assets/carousel1.jpg";
import image2 from "../assets/carousel2.jpg";
import image3 from "../assets/carousel3.jpg";
import image4 from "../assets/carousel4.jpg";

const Home = () => {
  const carouselImages = [
    image1,
    image2,
    image3,
    image4,
    // "https://i.natgeofe.com/n/672b580d-0597-4e59-b57c-51f149bf92e8/80254.jpg",
    // "https://cdn.shopify.com/s/files/1/0010/4280/8889/products/PL7915LatPulldownSeatedRow-USAProline-WEB_800x.jpg?v=1600794980",
    // "https://i0.wp.com/post.healthline.com/wp-content/uploads/2022/06/2059685-The-10-Best-Protein-Powders-to-Build-Muscle-in-2022-1296x728-Header-81b9bf.jpg?w=1155&h=1528",
  ];

  return (
    <div>
      <ProductsCarousel images={carouselImages} interval={5000} />
    </div>
  );
};

export default Home;
