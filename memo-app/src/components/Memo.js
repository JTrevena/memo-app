import "./Memo.css";
import { updateMemo, deleteMemo } from "../networking";
import { useState } from "react";

export default function Memo(props) {
  const { id, created_date, title, body } = props.memoData;
  const [showDelete, setShowDelete] = useState(false);

  async function handleUpdateMemo(e) {
    const text = e.target.value;
    const memoInfo = { id: id };
    if (e.target.className === "title-input") memoInfo.title = text;
    else if (e.target.className === "body-input") memoInfo.body = text;

    const updated = await updateMemo(memoInfo);

    if (updated) {
      // TODO: notification to let user know the memo has been updated
    } else {
      throw new Error("Failed to update! Check HTTP response.");
    }
  }

  async function handleDeleteMemo() {
    props.removeMemo(id);

    const deleted = await deleteMemo(id);
    if (!deleted) throw new Error("Failed to delete! Check HTTP response.");
  }

  function handleShowDeleteBtn() {
    setShowDelete(true);
  }

  function handleHideDeleteBtn() {
    setShowDelete(false);
  }

  return (
    <div
      id={`memo-tile-${id}`}
      className="memo-tile-wrapper"
      onMouseEnter={handleShowDeleteBtn}
      onMouseLeave={handleHideDeleteBtn}
    >
      <div className="text-and-btn-wrapper">
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
        {showDelete && (
          <button className="delete-btn" id={`delete-btn-${id}`} onClick={handleDeleteMemo}>
            Delete Memo...
          </button>
        )}
      </div>
    </div>
  );
}
