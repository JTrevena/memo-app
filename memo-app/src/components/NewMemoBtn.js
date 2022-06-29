import { useState, useEffect } from "react";
import { postNewMemo } from "../networking";

export default function NewMemoBtn(props) {
  const { memoDataArr, setMemoDataArr } = props;
  const [newestMemoID, setNewestMemoID] = useState(undefined);

  useEffect(() => {
    if (newestMemoID) focusNewMemoTitle(newestMemoID);
  }, [newestMemoID]);

  function focusNewMemoTitle(id) {
    const newMemoTitle = document.getElementById(`title-input-${id}`);
    newMemoTitle.focus();
  }

  function generateNewMemoIDLocally() {
    if (memoDataArr.length === 0) return 1;
    const orderedMemoData = [...memoDataArr].sort((a, b) => (a.id < b.id ? 1 : -1));
    const greatestCurrentID = orderedMemoData[0].id;
    return greatestCurrentID + 1;
  }

  async function addNewMemoToPage(id, date) {
    const newMemo = {
      id: id,
      created_date: date,
      title: "",
      body: "",
    };
    setMemoDataArr(memoDataArr.concat([newMemo]));
    setNewestMemoID(id);
  }

  async function handleNewMemo() {
    let memoID;
    let createdDate;

    try {
      const { id, created_date } = await postNewMemo();
      memoID = id;
      createdDate = created_date;
    } catch {
      memoID = generateNewMemoIDLocally();
      createdDate = new Date();
    }

    addNewMemoToPage(memoID, createdDate);
  }

  return (
    <button className="new-memo-btn" onClick={handleNewMemo}>
      Add a New Memo!
    </button>
  );
}
