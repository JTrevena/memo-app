import "./Memo.css";
import { updateMemo, deleteMemo } from "../networking";
import { useState } from "react";
const CHAR_WARNING_THRESHOLD = 15;
const MAX_CHARS_BODY = 140;
const MAX_CHARS_TITLE = 40;
const POPUP_TIMEOUT = 1750;

export default function Memo(props) {
  const { id, title, body } = props.memoData;
  const [numCharsUsed, setNumCharsUsed] = useState(body.length);
  const [showCharWarning, setShowCharWarning] = useState(MAX_CHARS_BODY - numCharsUsed <= CHAR_WARNING_THRESHOLD);
  const [showDelete, setShowDelete] = useState(false);

  function updateLocalMemoData(section, text) {
    const copyArr = [...props.memoDataArr];
    let indexToUpdate;
    for (let i = 0; i < copyArr.length; i++) {
      const currentMemo = copyArr[i];
      if (currentMemo.id === id) {
        indexToUpdate = i;
        break;
      }
    }

    if (section === "title") {
      copyArr[indexToUpdate].title = text;
    } else if (section === "body") {
      copyArr[indexToUpdate].body = text;
    }

    props.setMemoDataArr(copyArr);
  }

  async function handleUpdateMemo(e) {
    const text = e.target.value;
    const memoInfo = { id: id };

    if (e.target.className === "title-input") {
      memoInfo.title = text;
      updateLocalMemoData("title", text);
    } else if (e.target.className === "body-input") {
      memoInfo.body = text;
      updateLocalMemoData("body", text);
    }

    try {
      const updated = await updateMemo(memoInfo);
      if (!updated) throw new Error("Failed to update! Check HTTP response.");
    } catch (err) {
      console.log(err);
    }
    handleShowUpdatedPopup();
  }

  async function handleDeleteMemo() {
    try {
      const deleted = await deleteMemo(id);
      if (!deleted) throw new Error("Failed to delete! Check HTTP response.");
    } catch (err) {
      console.log(err);
    }

    props.removeMemo(id);
  }

  function handleShowDeleteBtn() {
    setShowDelete(true);
  }

  function handleHideDeleteBtn() {
    setShowDelete(false);
  }

  function handleShowUpdatedPopup() {
    const popup = document.getElementById(`updated-popup-${id}`);
    popup.classList.add("show");
    setTimeout(() => popup.classList.remove("show"), POPUP_TIMEOUT);
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
          maxLength={MAX_CHARS_TITLE}
          placeholder="Memo Title"
          defaultValue={title ? title : ""}
          onBlur={handleUpdateMemo}
        ></textarea>
        <textarea
          className="body-input"
          id={`body-input-${id}`}
          maxLength={MAX_CHARS_BODY}
          placeholder="notes..."
          defaultValue={body ? body : ""}
          onChange={e => {
            const charsUsed = e.target.value.length;
            setNumCharsUsed(charsUsed);
            setShowCharWarning(MAX_CHARS_BODY - charsUsed <= CHAR_WARNING_THRESHOLD);
          }}
          onBlur={handleUpdateMemo}
        ></textarea>
        {showCharWarning && (
          <span className="char-limit-warning">
            {numCharsUsed} / {MAX_CHARS_BODY}
          </span>
        )}
        {showDelete && (
          <button className="delete-btn" id={`delete-btn-${id}`} onClick={handleDeleteMemo}>
            Delete Memo...
          </button>
        )}
      </div>
      <div className="updated-popup">
        <span id={`updated-popup-${id}`} className="updated-popup">
          Updated!
        </span>
      </div>
    </div>
  );
}
