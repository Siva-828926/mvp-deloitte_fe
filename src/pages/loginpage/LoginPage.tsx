import logoBg from "../../assets/login_bg.jpg";
import LoginForm from "../../components/loginform/LoginForm";
import deloittelogo from "../../assets/deloittelogo.png";
import "./LoginPage.css"

const LoginPage = () => {
  return (
    <div className="flex h-screen">
      <div
        className="w-1/2 relative inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${logoBg})` }}
      >
        <div
          className="absolute inset-0 bg-gray-500"
          style={{ opacity: "0.7" }}
        ></div>
        <div style={{ height: "10%" }} className="">
          <div className="w-1/4 h-full relative justify-center items-center flex">
            <img
              className="w-3/4 h-3/4 object-cover"
              alt="logo"
              src={deloittelogo}
            />
          </div>
        </div>

        <div style={{ height: "70%" }}></div>

        <div style={{ height: "20%" }} className="text-white">
          <div className="p-7 relative">
            <div className="pt-1">
              <p className="font-bold text-2xl">
                {" "}
                Welcome to{" "}
                <span className="text-3xl">Mosaic Billing Portal</span>
              </p>
            </div>
            <div className="pt-6 border-b border-white w-1/4"></div>
            <div className="pt-5">
              <h5 className="text-s"> Login to access your dashboard</h5>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-loginpage-white w-1/2">
      </div>
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="bg-loginpage-white-center p-4 h-2/4 w-1/4 rounded-[20px] overflow-auto">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
