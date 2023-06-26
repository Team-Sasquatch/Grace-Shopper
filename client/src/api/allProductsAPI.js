export default async function getAllProducts() {
  try {
    const response = await fetch(`/api/products`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
  getAllProducts();
}

export default async function getProductsByCategory(){
    try {
        const response = await fetch(`/api/products/:category`);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error(error);
      }
      getProductsByCategory();
}
