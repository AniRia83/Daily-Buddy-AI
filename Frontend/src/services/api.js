const API_BASE = "https://ai-dailybuddy-backend.onrender.com";

// -------------------------------
// Send a new journal entry
// -------------------------------
export async function sendJournalEntry(text) {
  const response = await fetch(`${API_BASE}/add_entry`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    throw new Error("Failed to save entry");
  }

  return response.json();
}

// -------------------------------
// Load all journal entries
// -------------------------------
export async function getEntries() {
  const response = await fetch(`${API_BASE}/get_entries`);

  if (!response.ok) {
    throw new Error("Failed to load entries");
  }

  return response.json();
}

// -------------------------------
// Mood analysis for graph
// -------------------------------
export async function analyzeMood() {
  const response = await fetch(`${API_BASE}/mood`);

  if (!response.ok) {
    throw new Error("Failed to analyze mood");
  }

  return response.json();
}

// -------------------------------
// Semantic search (AI similarity)
// -------------------------------
export async function searchSimilar(text) {
  const response = await fetch(`${API_BASE}/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    throw new Error("Search request failed");
  }

  return response.json();
}
