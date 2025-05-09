
export const DiaryList = ({ entries }) => {
  if (!entries || entries.length === 0) {
    return <p className="text-center">No entries yet.</p>;
  }

  return (
    <div className="mt-5">
      <h3 className="text-center">Your Diary Entries</h3>
      <ul className="list-group">
        {entries.map((entry) => (
          <li key={entry.id || `${entry.title}-${entry.created_at}`} className="list-group-item">
            <h5>{entry.title}</h5>
            <p>{entry.content}</p>
            <small><strong>Mood:</strong> {entry.mood?.trim() ? entry.mood : "No mood given"}</small>
            <br />
            <small><em>
              {entry.created_at ? new Date(entry.created_at).toLocaleString() : "Invalid Date"}
            </em></small>
          </li>
        ))}
      </ul>
    </div>
  );
};