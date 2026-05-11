// const API_BASE = "http://localhost:8086";
const API_BASE = "https://habit-tracker-backend.onrender.com"

const handleResponse = async (res, errorMsg) => {
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || errorMsg);
  }
  return res.json();
};

const getAuthHeaders = () => {
  const token = localStorage.getItem("authToken");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export async function fetchChallenges() {
  const res = await fetch(`${API_BASE}/challenges`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  const data = await handleResponse(res, "Failed to fetch challenges");
  return data.results;
}

export async function fetchCategories() {
  const res = await fetch(`${API_BASE}/categories`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  const data = await handleResponse(res, "Failed to fetch categories");
  return data.results;
}

export async function fetchHabitsByCategory(category_id) {
  const res = await fetch(`${API_BASE}/habits/${category_id}`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  const data = await handleResponse(res, "Failed to fetch habits");
  return data.result;
}

export async function addHabitToCategory(habitData) {
  const res = await fetch(`${API_BASE}/habit`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(habitData),
  });
  const data = await handleResponse(res, "Failed to add habit");
  return data.result;
}
