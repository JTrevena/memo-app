import "./App.css";
import React from "react";
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
    created_date: new Date("2022-06-27"),
    title: "A Different Title",
    body: "A Different Body",
  };
  const memoDataArr = [exampleMemoOne, exampleMemoTwo];

  function renderMemos() {
    return memoDataArr.map(memo => {
      return <Memo className={`memo-${memo.id}`} key={memo.id} memoData={memo} />;
    });
  }
  return <div className="App">{renderMemos()}</div>;
}

export default App;
