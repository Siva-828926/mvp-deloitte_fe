import { Outlet } from "react-router-dom";
import Footer from "../../components/footer/Footer.tsx";
import Header from "../../components/header/Header.tsx";

const DashboardPage = () => {
  return (
    <div className="h-screen flex flex-col">
      <div className="w-full h-20">
        <Header />
      </div>

      <div className="flex-1">
        <div className="p-3 w-full h-full bg-loginpage-white">
          <Outlet />
        </div>
      </div>

      <div className="w-full h-10">
        <Footer />
      </div>
    </div>
  );
};

export default DashboardPage;
