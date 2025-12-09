export default function EntryList({ entries }) {
  return (
    <div className="card">
      <h2>Past Entries</h2>

      {entries.length === 0 ? (
        <p>No entries yet.</p>
      ) : (
        entries.map((e, i) => (
          <div key={i} className="entry-item">
            {e.text}
            <div className="entry-date">{e.date}</div>
          </div>
        ))
      )}
    </div>
  );
}
