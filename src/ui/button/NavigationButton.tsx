import "./NavigationButton.css";

const NavigationButton = ({ id, buttonOnclickHandler, buttonDisplayName }) => {
  return (
    <button
      key={id}
      className="nav-button"
      onClick={() => buttonOnclickHandler(id)}
    >
      {" "}
      {buttonDisplayName}{" "}
    </button>
  );
};

export default NavigationButton;
