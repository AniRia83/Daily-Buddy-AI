import { useState } from "react";

export default function EntryList({ entries }) {
  const [openEntry, setOpenEntry] = useState(null);

  function toggleEntry(id) {
    setOpenEntry(openEntry === id ? null : id);
  }

  return (
    <div className="card">
      <h2>Past Entries</h2>

      {entries.length === 0 ? (
        <p>No entries yet.</p>
      ) : (
        entries.map((entry) => (
          <div
            key={entry.id}
            className="entry-item"
            style={{
              borderBottom: "1px solid #ddd",
              padding: "10px 0",
              cursor: "pointer",
            }}
            onClick={() => toggleEntry(entry.id)}
          >
            {/* Row: preview text + sentiment tag */}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ fontWeight: "bold" }}>
                {(entry.text || "").slice(0, 40)}...
              </div>

              <div
                style={{
                  background:
                    entry.sentiment === "happy"
                      ? "#9be7a5"
                      : entry.sentiment === "sad"
                      ? "#f8b7b7"
                      : entry.sentiment === "stressed"
                      ? "#ffdd99"
                      : entry.sentiment === "excited"
                      ? "#a4d2ff"
                      : "#eee",
                  padding: "4px 8px",
                  borderRadius: "8px",
                  fontSize: "12px",
                  textTransform: "capitalize",
                }}
              >
                {entry.sentiment}
              </div>
            </div>

            {/* Expandable details */}
            {openEntry === entry.id && (
              <div style={{ marginTop: "10px", lineHeight: "1.5" }}>
                <p>
                  <strong>Full Entry:</strong>
                  <br />
                  {entry.text}
                </p>

                <p>
                  <strong>Summary:</strong>
                  <br />
                  {entry.summary}
                </p>

                <p style={{ fontSize: "12px", color: "#777" }}>
                  <strong>Date:</strong>{" "}
                  {entry.date ? entry.date : "No date recorded"}
                </p>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
