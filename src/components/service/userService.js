// const API_BASE = "http://localhost:8086";
const API_BASE = "https://habit-tracker-backend.onrender.com"

export const registerUser = async (data) => {
  const res = await fetch(`${API_BASE}/user`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Registration failed");
  }

  return res.json();
};
