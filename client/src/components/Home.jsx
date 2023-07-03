import { Link } from "react-router-dom";
import ProductsCarousel from "./ProductsCarousel";

const Home = () => {
  const carouselImages = [
    "https://i.natgeofe.com/n/672b580d-0597-4e59-b57c-51f149bf92e8/80254.jpg",
    "https://cdn.shopify.com/s/files/1/0010/4280/8889/products/PL7915LatPulldownSeatedRow-USAProline-WEB_800x.jpg?v=1600794980",
    "https://i0.wp.com/post.healthline.com/wp-content/uploads/2022/06/2059685-The-10-Best-Protein-Powders-to-Build-Muscle-in-2022-1296x728-Header-81b9bf.jpg?w=1155&h=1528",
  ];

  return (
    <div>
      <h3>Welcome Home Sasquatch</h3>
      <ProductsCarousel images={carouselImages} />
    </div>
  );
};

export default Home;
