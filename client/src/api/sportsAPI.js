export async function getSports() {
  try {
    const response = await fetch(`/api/sports`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function createSport(name,description){
  try {
    const response = await fetch('/api/sports',{
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        name,
        description
      })
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}