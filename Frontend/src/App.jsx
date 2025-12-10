import { useState, useEffect } from "react";
import JournalInput from "./components/JournalInput";
import EntryList from "./components/EntryList";
import MoodGraph from "./components/MoodGraph";
import { getEntries } from "./services/api";

export default function App() {
  const [entries, setEntries] = useState([]);

  // Load entries from backend on startup
  useEffect(() => {
    async function load() {
      try {
        const data = await getEntries();
        setEntries(data.reverse()); // newest first
      } catch (error) {
        console.error("Failed to load entries:", error);
      }
    }
    load();
  }, []);

  // Add new entry to top
  function onEntrySaved(newEntry) {
    setEntries((prev) => [newEntry, ...prev]);
  }

  return (
    <div className="app-container">
      <h1>DailyBuddy</h1>

      <JournalInput onEntrySaved={onEntrySaved} />

      <EntryList entries={entries} />

      <MoodGraph entries={entries} />
    </div>
  );
}
