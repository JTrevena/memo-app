import "./SortBtn.css";

export default function SortBtn(props) {
  const { memoDataArr, setMemoDataArr } = props;

  function handleSortByTitle() {
    const copyArr = [...memoDataArr];
    copyArr.sort((a, b) => {
      return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
    });
    setMemoDataArr(copyArr);
  }

  function handleSortByDate() {}

  return (
    <div className="sort-btn-wrapper">
      <button className="sort-btn" id="sort-btn">
        Sort by...
      </button>
      <div className="sort-options-wrapper">
        <button id="sort-title-btn" className="sort-option" onClick={handleSortByTitle}>
          Title
        </button>
        <button id="sort-date-btn" className="sort-option">
          Date Created
        </button>
      </div>
    </div>
  );
}
