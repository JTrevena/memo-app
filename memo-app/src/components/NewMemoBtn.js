import { postNewMemo } from "../networking";

export default function NewMemoBtn(props) {
  const { memoDataArr, setMemoDataArr } = props;

  function generateNewMemoID() {
    const orderedMemoData = [...memoDataArr].sort((a, b) => (a.id < b.id ? 1 : -1));
    const greatestCurrentID = orderedMemoData[0].id;
    return greatestCurrentID + 1;
  }

  async function addNewMemo(id, date) {
    const newMemo = {
      id: id,
      created_date: date,
    };
    setMemoDataArr(memoDataArr.concat([newMemo]));
  }

  function focusNewMemoTitle(id) {
    const newMemoTitle = document.getElementById(`title-input-${id}`);
    newMemoTitle.focus();
  }

  async function handleNewMemo() {
    const id = generateNewMemoID(); // This line and the one below are placeholders
    const created_date = new Date(); // They allow memos to be created locally without connecting to the backend

    // Use the following line once backend is set up:
    // const {id, created_date} = await postNewMemo()

    await addNewMemo(id, created_date);
    focusNewMemoTitle(id);
  }

  return (
    <button className="new-memo-btn" onClick={handleNewMemo}>
      Add a New Memo!
    </button>
  );
}
