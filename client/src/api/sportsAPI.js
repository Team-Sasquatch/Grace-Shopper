export default async function getSports() {
  try {
    const response = await fetch(`/api/sports`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
  getRoutines();
}
