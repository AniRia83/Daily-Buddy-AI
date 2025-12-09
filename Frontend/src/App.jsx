import { useState } from "react";
import JournalInput from "./components/JournalInput";
import EntryList from "./components/EntryList";
import MoodGraph from "./components/MoodGraph";

export default function App() {
  const [entries, setEntries] = useState([]);

  function onEntrySaved(entry) {
    setEntries([entry, ...entries]);
  }

  return (
    <div className="app-container">
      <h1>DailyBuddy</h1>

      <JournalInput onEntrySaved={onEntrySaved} />

      <EntryList entries={entries} />

      <MoodGraph /> 
    </div>
  );
}
