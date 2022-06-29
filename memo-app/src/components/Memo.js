import "./Memo.css";

export default function Memo(props) {
  const { id, created_date, title, body } = props.memoData;

  return (
    <div className="memo-tile-wrapper">
      <div className={`memo-tile-${id}`}>
        <form>
          <input
            className="title-input"
            id={`title-input-${id}`}
            type="text"
            placeholder="Memo Title"
            defaultValue={title ? title : ""}
          ></input>
          <input
            className="body-input"
            id={`body-input-${id}`}
            type="text"
            placeholder="notes..."
            defaultValue={body ? body : ""}
          ></input>
        </form>
      </div>
    </div>
  );
}
