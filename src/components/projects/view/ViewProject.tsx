import React from "react";
import Card from "../../../ui/card/Card";
import { FiSearch } from "react-icons/fi";

const ViewProject = () => {
  return (
    <div className="bg-white p-6 rounded-lg relative">
      <h2 className="text-lg font-semibold mb-4 text-gray-500">View Project</h2>
      <div className="absolute top-0 right-0 mt-10 mr-12 flex items-center">
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 px-2 py-1 rounded-l-md focus:outline-none text-xs"
        />
        <button className="bg-blue-500 text-white px-3 py-1 rounded-r-md hover:bg-blue-600 focus:outline-none text-xs flex items-center">
          <FiSearch className="mr-1" /> Search
        </button>
      </div>
      <Card
        projectName="Project X"
        gvmName="John Doe"
        gvmMail="john@example.com"
        startDate="2024-05-15"
        endDate="2024-12-31"
        allocatedBudget="$50,000"
        proposedBudget="$60,000"
        numOfVersions={5}
      />
    </div>
  );
};

export default ViewProject;
