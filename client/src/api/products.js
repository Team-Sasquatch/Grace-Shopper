export default async function getAllProducts() {
  try {
    const response = await fetch(`/api/products`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
  // getAllProducts();
}

export async function getProductsBySupplement() {
  try {
    const response = await fetch(`/api/products/category/supplement`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
  // getProductsByCategory();
}

export async function getProductsByEquipment() {
  try {
    const response = await fetch(`/api/products/category/equipment`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
  // getProductsByCategory();
}

export async function getProductsByApparel() {
  try {
    const response = await fetch(`/api/products/category/apparel`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
  // getProductsByCategory();
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

export async function getProductBySport(sportId) {
  try {
    const response = await fetch(`/api/products/product_sport/${sportId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function postProduct(name,sport_id,price,description,category,flavor){
  try {
    const response = await fetch("/api/products/",{
      method: "POST",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        sport_id,
        price,
        description,
        category,
        flavor,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}