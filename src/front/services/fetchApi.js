const API_URL =
  "https://scaling-space-telegram-7v5v546jwq67cwq95-3001.app.github.dev/api";

export const createUser = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Unknown error");
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const createDiaryEntry = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Unknown error");
    }

    const data = await response.json();
    console.log("Successfully created user", data);
  } catch (error) {
    console.error("error creating user:", error);
  }
};
