import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

function Login() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (isLogin) => {
    try {
      if (isLogin) {
        const result = await axios.post(
          BASE_URL + "/login",
          {
            emailId,
            password,
          },
          { withCredentials: true }
        );
        console.log(result);
        dispatch(addUser(result.data.user));
        navigate("/");
      } else {
        // Sign up flow
        const result = await axios.post(
          BASE_URL + "/signup",
          {
            firstName,
            lastName,
            emailId,
            password,
          },
          { withCredentials: true }
        );
        console.log(result);
        dispatch(addUser(result.data.user));
        navigate("/profile");
      }
    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.message);
    }
  };

  return (
    <>
      <div className="flex justify-center my-10">
        <div className="card card-border bg-base-100 w-96">
          <div className="card-body">
            <h2 className="card-title">{isLogin ? "Login" : "Sign Up"}</h2>
            <fieldset className="fieldset">
              {!isLogin && (
                <>
                  <legend className="fieldset-legend">First Name</legend>
                  <input
                    type="text"
                    className="input"
                    placeholder="Type here"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <legend className="fieldset-legend">Last Name</legend>
                  <input
                    type="text"
                    className="input"
                    placeholder="Type here"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </>
              )}
              <legend className="fieldset-legend">Email</legend>
              <input
                type="text"
                className="input"
                placeholder="Type here"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
              <legend className="fieldset-legend">Password</legend>
              <input
                type="password"
                className="input"
                placeholder="Type here"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
            <p className="text-red-500">{error}</p>
            <div className="card-actions justify-center">
              <button
                className="btn btn-primary"
                onClick={() => handleLogin(isLogin)}
              >
                {isLogin ? "Login" : "Sign Up"}
              </button>
            </div>
            <p
              className="text-blue-800 m-auto cursor-pointer"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "New User? SignUp" : "Login here"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
