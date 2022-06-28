import "./Memo.css";

export default function Memo(props) {
  const { id, created_date, title, body } = props.memoData;

  return (
    <div className="memo-tile-wrapper">
      <div className={`memo-tile-${id}`}>
        <form>
          <text>This is a test tile</text>
          <br />
          <text>This tile's id is "{id}"</text>
          <br />
          <text>This tile's title is "{title}"</text>
        </form>
      </div>
    </div>
  );
}
