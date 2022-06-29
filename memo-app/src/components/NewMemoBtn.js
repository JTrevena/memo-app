export default function NewMemoBtn(props) {
  const { memoDataArr, setMemoDataArr } = props;

  function getNewMemoID() {
    return [...memoDataArr].sort((a, b) => (a.id < b.id ? 1 : -1))[0].id + 1; // one greater than largest current ID
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
    const newMemoID = getNewMemoID(); // TODO: Make this correspond to the response from the POST request
    const createdDate = new Date(); // TODO: As above
    await addNewMemo(newMemoID, createdDate);
    focusNewMemoTitle(newMemoID);
  }

  return (
    <button className="new-memo-btn" onClick={handleNewMemo}>
      Add a New Memo!
    </button>
  );
}
