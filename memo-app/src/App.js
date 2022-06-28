import "./App.css";
import React, { useState } from "react";
import Memo from "./components/Memo.js";

function App() {
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

  const [memoDataArr, setMemoDataArr] = useState([exampleMemoOne, exampleMemoTwo]);

  function getNewMemoID() {
    return [...memoDataArr].sort((a, b) => (a.id < b.id ? 1 : -1))[0].id + 1; // one greater than largest current ID
  }

  function handleNewMemo() {
    const newMemoID = getNewMemoID(); // TODO: Make this correspond to the response from the POST request
    const newCreatedDate = new Date(); // TODO: As above
    const newMemo = {
      id: newMemoID,
      created_date: newCreatedDate,
    };
    setMemoDataArr(memoDataArr.concat([newMemo]));
  }

  function renderMemos() {
    return memoDataArr.map(memo => {
      return <Memo className={`memo-${memo.id}`} key={memo.id} memoData={memo} />;
    });
  }
  return (
    <div className="App">
      <div className="new-memo-btn-wrapper">
        <button className="new-memo-btn" onClick={handleNewMemo}>
          Add a New Memo!
        </button>
      </div>
      <div className="memos-wrapper">{renderMemos()}</div>
    </div>
  );
}

export default App;
