export async function registerUser(username, password) {
  try {
    const response = await fetch("/api/auth/register", {
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
    const response = await fetch("/api/auth/me");
    const { success, message, user } = await response.json();
    if (!success) {
      throw {
        message,
      };
    }
    return {
      success,
      message,
      user,
    };
  } catch (error) {
    console.log(error);
  }
}

export async function fetchUser(username) {
  try {
    const response = await fetch("/api/users/id/${username}", {
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
    const response = await fetch("/api/auth/logout");
    const { success, message } = await response.json();
    if (!success) {
      throw {
        message,
      };
    }
    return {
      success,
      message,
    }
  }