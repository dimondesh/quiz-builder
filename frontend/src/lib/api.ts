const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export const api = {
  async get(path: string) {
    const res = await fetch(`${API_URL}${path}`, { cache: "no-store" });
    if (!res.ok) throw new Error("GET request failed");
    return res.json();
  },

  async post(path: string, body: unknown) {
    const res = await fetch(`${API_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error("POST request failed");
    return res.json();
  },

  async delete(path: string) {
    const res = await fetch(`${API_URL}${path}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("DELETE request failed");
  },
};
