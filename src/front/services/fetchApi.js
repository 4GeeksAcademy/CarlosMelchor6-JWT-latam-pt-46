const API_URL = import.meta.env.VITE_BACKEND_URL;

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

export const createDiaryEntry = async (title, content, mood) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found.");
    }
    const response = await fetch(`${API_URL}/diary`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, content, mood }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Unknown error");
    }

    return data.entry;
  } catch (error) {
    console.error("Error creating diary entry:", error);
    throw error;
  }
};

export const tokenLogin = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/token`, {
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

    if (data.token) {
      localStorage.setItem("token", data.token);
    }

    return data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export const getDiaryEntries = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found.");
    }

    const response = await fetch(`${API_URL}/diary`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch diary entries.");
    }

    return data;
  } catch (error) {
    console.error("Error fetching diary entries:", error);
    throw error;
  }
};
