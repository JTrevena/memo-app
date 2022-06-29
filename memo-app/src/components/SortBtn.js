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
    copyArr.sort((a, b) => {
      const dateStrA = new Date(a.created_date).toISOString();
      const dateStrB = new Date(b.created_date).toISOString();
      return dateStrA.localeCompare(dateStrB);
    });
    setMemoDataArr(copyArr);
  }

  return (
    <div className="sort-btn-wrapper">
      <button className="sort-btn" id="sort-btn">
        Sort by...
      </button>
      <div className="sort-options-wrapper">
        <button id="sort-title-btn" className="sort-option" onClick={handleSortByTitle}>
          Title (Alphabetically)
        </button>
        <button id="sort-date-btn" className="sort-option" onClick={handleSortByDate}>
          Date Created (Oldest first)
        </button>
      </div>
    </div>
  );
}
