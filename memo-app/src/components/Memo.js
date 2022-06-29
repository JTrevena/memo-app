import "./Memo.css";

export default function Memo(props) {
  const { id, created_date, title, body } = props.memoData;

  return (
    <div className="memo-tile-wrapper">
      <div className={`memo-tile-${id}`}>
        <textarea
          className="title-input"
          id={`title-input-${id}`}
          placeholder="Memo Title"
          defaultValue={title ? title : ""}
        ></textarea>
        <textarea
          className="body-input"
          id={`body-input-${id}`}
          type="textarea"
          placeholder="notes..."
          defaultValue={body ? body : ""}
        ></textarea>
      </div>
    </div>
  );
}
