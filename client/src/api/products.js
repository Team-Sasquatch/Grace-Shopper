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

export async function getProductsByCategory() {
  try {
    const response = await fetch(`/api/products/category/supplement`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
  getProductsByCategory();
}

export async function getProductById(id) {
  try {
    const response = await fetch(`/api/products/${id}`);
    const data = await response.json();
    return data[0];
  } catch (error) {
    console.error(error);
  }
}
