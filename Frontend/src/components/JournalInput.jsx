import { useState } from "react";
import { sendJournalEntry } from "../services/api";   // ✅ FIXED IMPORT

export default function JournalInput({ onEntrySaved }) {
  const [entry, setEntry] = useState("");

  async function saveEntry() {
    try {
      const data = await sendJournalEntry(entry);   // ✅ FIXED FUNCTION CALL

      onEntrySaved({
        text: entry,
        summary: data.summary,
        sentiment: data.sentiment,
      });

      setEntry(""); // reset input
    } catch (error) {
      console.error("Saving error:", error);
      alert("Error saving entry.");
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
