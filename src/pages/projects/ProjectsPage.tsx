import React, { useState } from "react";
import CreateBudget from "../../components/budgets/CreateBudget";
import CreateProject from "../../components/projects/create/CreateProject";

export default function ProjectsPage() {
  const [isProjectCreated, setIsProjectCreated] = useState(false);
  const [projectId , setProjectId] = useState()

  const updateProjectCreated = (createdProjectId) => {
    setIsProjectCreated(true);
    console.log(" PJ Set " , createdProjectId)
    setProjectId(createdProjectId)
  };
  return ( 
    <div>
      <CreateProject isProjectCreated = {updateProjectCreated} />
      {isProjectCreated && <CreateBudget projectId = {projectId} />}
    </div>
  );
}
