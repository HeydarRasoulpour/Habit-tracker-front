const API_BASE = "http://localhost:8086";

export const loginUser = async (data) => {
  const res = await fetch(`${API_BASE}/user/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Login failed");
  }

  return res.json();
};
