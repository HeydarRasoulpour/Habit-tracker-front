// const API_BASE = "http://localhost:8086";
const API_BASE = "https://habit-tracker-backend.onrender.com"


export const addHabitApi = async (habit, imageFile) => {
  const token = localStorage.getItem("authToken");
  const formData = new FormData();

  Object.keys(habit).forEach(key => formData.append(key, habit[key]));
  if (imageFile) formData.append("image", imageFile);

  const res = await fetch(`${API_BASE}/habit`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to save habit");
  }

  return res.json();
};

export const getHabitsApi = async () => {
  const token = localStorage.getItem("authToken");
  const res = await fetch(`${API_BASE}/habits`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch habits");
  }

  return res.json();
};

export const deactivateHabitsApi = async (habit_id) => {
  const token = localStorage.getItem("authToken");
  const res = await fetch(`${API_BASE}/habit/${habit_id}`, {
    
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch habits");
  }

  return res.json();
};
