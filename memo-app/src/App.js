import "./App.css";
import React, { useState } from "react";
import Memo from "./components/Memo.js";
import NewMemoBtn from "./components/NewMemoBtn";

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

  function renderMemos() {
    return memoDataArr.map(memo => {
      return <Memo className={`memo-${memo.id}`} key={memo.id} memoData={memo} />;
    });
  }

  return (
    <div className="App">
      <div className="new-memo-btn-wrapper">
        <NewMemoBtn memoDataArr={memoDataArr} setMemoDataArr={setMemoDataArr}></NewMemoBtn>
      </div>
      <div className="memos-wrapper">{renderMemos()}</div>
    </div>
  );
}

export default App;
