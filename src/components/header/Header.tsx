import NavigationButton from "../../ui/button/NavigationButton";
import deloittelogo from "../../assets/deloittelogo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";

const Header = () => {
  const navigationOptions = [
    {
      id: 1,
      displayName: "Dashboard",
    },
    {
      id: 2,
      displayName: "Projects",
    },
    {
      id: 3,
      displayName: "Budgets",
    },
  ];

  const [isProfileClicked, setisProfileClicked] = useState(false);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    console.log(" Cliked ");
    setisProfileClicked(true);
  };

  const handleLogout = () => {
    console.log(" logout cliked ");
  };

  const handleNavigationButtonClick = (id) => {
    console.log(" Button Clicked ", id);
    if (id == 1) {
      navigate("/dashboard/");
    } else if (id == 2) {
      navigate("/dashboard/projects");
    } else {
      navigate("/dashboard/budgets");
    }
  };

  return (
    <div className="w-full h-full flex border-l-8 border-b-2 border-gray-500">
      <div className="flex-none w-50 pl-4">
        <img
          className="object-cover w-full h-full"
          alt="logo"
          src={deloittelogo}
        />
      </div>
      <div className="flex-auto flex justify-end  pr-10">
        {navigationOptions.map((data) => (
          //   deepcode ignore ReactMissingArrayKeys: <please specify a reason of ignoring this>
          <NavigationButton
            id={data.id}
            buttonOnclickHandler={handleNavigationButtonClick}
            buttonDisplayName={data.displayName}
          />
        ))}
      </div>


    </div>
  );
};

export default Header;
