import "./SortBtn.css";

export default function SortBtn(props) {
  const { memoDataArr, setMemoDataArr } = props;

  function handleSortByTitle() {
    const copyArr = [...memoDataArr];
    copyArr.sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));
    setMemoDataArr(copyArr);
  }

  function handleSortByDate() {
    const copyArr = [...memoDataArr];
    copyArr.sort((a, b) => (a.created_date < b.created_date ? 1 : -1));
    setMemoDataArr(copyArr);
  }

  return (
    <div className="sort-btn-wrapper">
      <button className="sort-btn" id="sort-btn">
        Sort by...
      </button>
      <div className="sort-options-wrapper">
        <button id="sort-title-btn" className="sort-option" onClick={handleSortByTitle}>
          Title
        </button>
        <button id="sort-date-btn" className="sort-option" onClick={handleSortByDate}>
          Date Created
        </button>
      </div>
    </div>
  );
}
