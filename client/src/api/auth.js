export async function registerUser(
  username,
  password,
  is_admin,
  address,
  address2,
  city,
  state,
  zipcode
) {
  try {
    const response = await fetch("/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        is_admin,
        address,
        address2,
        city,
        state,
        zipcode,
      }),
    });
    const result = await response.json();
    console.log("my result:", result);
    return result;
  } catch (error) {
    console.log("Error with registration: ", error);
  }
}

export async function loginUser(username, password) {
  try {
    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log("Error with login: ", error);
  }
}

export async function fetchMe() {
  try {
    const response = await fetch("/api/users/me", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchUser(id) {
  try {
    const response = await fetch(`/api/users/id/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log("Error getting user: ", error);
  }
}

export async function logOut() {
  try {
    const response = await fetch("/api/users/logout");
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function changeAddress(
  id,
  address,
  address2,
  city,
  state,
  zipcode
) {
  try {
    const response = await fetch(`/api/users/id/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        post: {
          address,
          address2,
          city,
          state,
          zipcode,
        },
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
