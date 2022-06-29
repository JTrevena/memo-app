import "./Memo.css";
import { updateMemo } from "../networking";

export default function Memo(props) {
  const { id, created_date, title, body } = props.memoData;

  async function handleUpdateMemo(e) {
    const text = e.target.value;
    const memoInfo = { id: id };
    if (e.target.className === "title-input") memoInfo.title = text;
    else if (e.target.className === "body-input") memoInfo.body = text;

    const updated = await updateMemo(memoInfo);

    if (updated) {
      // TODO: notification to let user know the memo has been updated
    } else {
      console.log("Failed to update! Check HTTP response.");
    }
  }

  return (
    <div id={`memo-tile-${id}`} className="memo-tile-wrapper">
      <textarea
        className="title-input"
        id={`title-input-${id}`}
        placeholder="Memo Title"
        defaultValue={title ? title : ""}
        onBlur={handleUpdateMemo}
      ></textarea>
      <textarea
        className="body-input"
        id={`body-input-${id}`}
        type="textarea"
        maxLength={140}
        placeholder="notes..."
        defaultValue={body ? body : ""}
        onBlur={handleUpdateMemo}
      ></textarea>
    </div>
  );
}
