const BudgetActions = ({
  addNewButtonHandler,
  addExportPDFHandler,
  addExportExcelHandler
}) => {
  return (
    <div className="flex justify-end">
      <button
        onClick={addNewButtonHandler}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg text-xs mr-2 font-semibold"
      >
        Add New
      </button>
      <button
        onClick={addExportPDFHandler}
        className="bg-green-500 text-white px-4 py-2 rounded-lg text-xs mr-2 font-semibold"
      >
        Export as PDF
      </button>
      <button
        onClick={addExportExcelHandler}
        className="bg-yellow-500 text-white px-4 py-2 rounded-lg text-xs font-semibold"
      >
        Export as Excel
      </button>
    </div>
  );
};

export default BudgetActions;
