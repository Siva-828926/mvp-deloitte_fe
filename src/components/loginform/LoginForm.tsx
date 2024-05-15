import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import ApiService from "../../service/ApiService";
import { useNavigate } from "react-router-dom";
import {  useDispatch } from 'react-redux'
import { setUserAuth } from "../../redux/slice/UserSlice";
import { toast } from "react-toastify";

const LoginForm = () => {
  // States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Objects
  const navigate = useNavigate();
  const dispatch = useDispatch()
  
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleLogin = () => {
    event?.preventDefault();
    if (email == "") {
      toast.error(" Please enter Email ID");
    } else if (!emailPattern.test(email)) {
      toast.error(" Please enter Valid Email ID");
    } else if (password == "") {
      toast.error(" Please enter Password");
    } else {
      const loginCredentials = {
        emailId: email,
        password: password,
      };
      ApiService.loginSerCall(loginCredentials)
        .then((res) => {
          if (res.serviceStatus) {
            toast.success(" Login Successfully!");
            dispatch(setUserAuth())
            navigate("/dashboard");
          } else {
            toast.error(res.serviceMessage);
            setEmail("");
            setPassword("");
          }
        })
        .catch((err) => toast.error(" Sorry, Something went wrong!"));
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  return (
    <form onSubmit={handleLogin}>
      <div className="m-2">
        <h2 className="text-center text-2xl font-bold mb-4">Login</h2>
        <div className="mb-4 mt-8">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1 mt-3"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 block w-full rounded border border-gray-300 h-12 pl-4"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 block w-full rounded border  border-gray-300  h-12 pl-4"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gray-500 text-white text-bold py-2 px-4 rounded-md focus:outline-none font-bold"
        >
          LOG IN
        </button>
        <div className="mt-6 text-center">
          <a href="#" className="text-gray-500 underline">
            Forgot password?
          </a>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
