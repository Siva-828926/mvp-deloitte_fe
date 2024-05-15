import DashboardPage from "./pages/dashboard/DashboardPage";
import LoginPage from "./pages/loginpage/LoginPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landing/LandingPage";
import ProjectsPage from "./pages/projects/ProjectsPage";
import BudgetPage from "./pages/budgets/BudgetPage";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="" Component={LoginPage} />
          <Route path="/dashboard/" Component={DashboardPage}>
            <Route index Component={LandingPage} />
            <Route path="projects" Component={ProjectsPage} />
            <Route path="budgets" Component={BudgetPage} />
          </Route>
        </Routes>
        <ToastContainer position="top-right" />
      </div>
    </Router>
  );
}

export default App;
