import "./App.css";
import React, { useEffect, useState } from "react";
import Memo from "./components/Memo.js";
import NewMemoBtn from "./components/NewMemoBtn";
import SortBtn from "./components/SortBtn";

function App() {
  const [memoDataArr, setMemoDataArr] = useState(() => {
    const localMemoData = window.localStorage.getItem("memoData");
    return localMemoData !== null ? JSON.parse(localMemoData) : [];
  });

  useEffect(() => {
    window.localStorage.setItem("memoData", JSON.stringify(memoDataArr));
  }, [memoDataArr]);

  function handleRemoveMemoFromArr(id) {
    let indexToDelete;
    for (let i = 0; i < memoDataArr.length; i++) {
      if (memoDataArr[i].id === id) {
        indexToDelete = i;
        break;
      }
    }
    let newMemoDataArr = [...memoDataArr];
    newMemoDataArr.splice(indexToDelete, 1);
    setMemoDataArr(newMemoDataArr);
  }

  function renderMemos() {
    return memoDataArr.map(memo => {
      return (
        <Memo
          className={`memo-${memo.id}`}
          key={memo.id}
          memoDataArr={memoDataArr}
          setMemoDataArr={setMemoDataArr}
          memoData={memo}
          removeMemo={handleRemoveMemoFromArr}
        />
      );
    });
  }

  return (
    <div className="App">
      <h1>Memo Board</h1>
      <div className="new-memo-btn-wrapper">
        <NewMemoBtn memoDataArr={memoDataArr} setMemoDataArr={setMemoDataArr} />
      </div>
      <div className="sort-btn-wrapper">
        <SortBtn memoDataArr={memoDataArr} setMemoDataArr={setMemoDataArr} />
      </div>
      <div className="memos-wrapper">{renderMemos()}</div>
    </div>
  );
}

export default App;
