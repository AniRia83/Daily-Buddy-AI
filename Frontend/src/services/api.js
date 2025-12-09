const API_BASE = "http://127.0.0.1:8000"; 
// or your Render backend URL

export async function sendJournalEntry(text) {
  const response = await fetch(`${API_BASE}/journal`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  return response.json();
}

export async function analyzeMood() {
  const response = await fetch(`${API_BASE}/mood`);
  return response.json();
}

export async function getAdvice() {
  const response = await fetch(`${API_BASE}/advice`);
  return response.json();
}
