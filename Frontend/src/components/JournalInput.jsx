import { useState } from "react";

const API_BASE = "https://ai-dailybuddy-backend.onrender.com";

export default function JournalInput({ onEntrySaved }) {
  const [entry, setEntry] = useState("");

  async function saveEntry() {
    if (!entry.trim()) return alert("Write something first!");

    try {
      const res = await fetch(`${API_BASE}/add_entry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entry }),
      });

      const data = await res.json();

      onEntrySaved({
        text: entry,
        date: new Date().toLocaleString(),
        mood: data.mood_score,  // optional
      });

      setEntry("");
    } catch (error) {
      console.error("Saving error:", error);
    }
  }

  return (
    <div className="card">
      <h2>Write Today's Journal</h2>

      <textarea
        className="textarea"
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        placeholder="How are you feeling today?"
      />

      <button className="button" onClick={saveEntry}>
        Save Entry
      </button>
    </div>
  );
}
