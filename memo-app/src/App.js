import "./App.css";
import React, { useState } from "react";
import Memo from "./components/Memo.js";
import NewMemoBtn from "./components/NewMemoBtn";
import SortBtn from "./components/SortBtn";

const exampleMemoOne = {
  id: 1,
  created_date: new Date("2022-06-27"),
  title: "Example Title",
  body: "Example Body",
};
const exampleMemoTwo = {
  id: 2,
  created_date: new Date("2022-06-28"),
  title: "A Different Title",
  body: "A Different Body",
};

function App() {
  const [memoDataArr, setMemoDataArr] = useState([exampleMemoOne, exampleMemoTwo]);

  function handleRemoveMemoFromArr(id) {
    console.log(id);
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
