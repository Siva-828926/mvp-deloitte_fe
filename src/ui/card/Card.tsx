const Card = ({
  projectName,
  gvmName,
  gvmMail,
  startDate,
  endDate,
  allocatedBudget,
  proposedBudget,
  numOfVersions,
}) => {
  const handleProjectClick = () => {
    // Handle project click event
    console.log("Project clicked:", projectName);
  };

  const handleDetailsClick = () => {
    // Handle details click event
    console.log("Details clicked for:", projectName);
  };

  return (
    <div className="relative bg-gradient-to-br from-gray-200 to-gray-100 rounded-lg shadow-md p-4 w-64">
      <div className="cursor-pointer mb-4" onClick={handleProjectClick}>
        <h2 className="text-lg font-semibold text-gray-800 bg-gray-100 py-1 px-2 rounded">{projectName}</h2>
      </div>
      <div className="text-xs text-gray-600 cursor-pointer" onClick={handleDetailsClick}>
        <p><span className="font-semibold">GVM Name:</span> {gvmName}</p>
        <p><span className="font-semibold">GVM Mail:</span> {gvmMail}</p>
        <p><span className="font-semibold">Start Date:</span> {startDate}</p>
        <p><span className="font-semibold">End Date:</span> {endDate}</p>
        <p><span className="font-semibold">Allocated Budget:</span> {allocatedBudget}</p>
        <p><span className="font-semibold">Proposed Budget:</span> {proposedBudget}</p>
      </div>
      <div className="absolute top-2 right-2 bg-orange-400 text-white py-1 px-2 rounded-full text-xs">{numOfVersions} Versions</div>
    </div>
  );
};

export default Card;
