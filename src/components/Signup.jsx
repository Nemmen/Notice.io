import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Student",
    batch: "uniques 1.0",
    confirm_password: "",
  });
  const navigate = useNavigate();
  const changeHandle = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };
  const submitHandle = async () => {
    console.log(signupData);
    if (signupData.password !== signupData.confirm_password) {
      return toast.error("password !== confirm password does not match");
    }
    try {
      const response = await axios.post(
        "http://localhost:9000/signup",
        signupData
      );
      navigate("/login");
      toast.success(response.data.message);
    } catch (err) {
      toast.error(err.response.data.Message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div>
            
          </div>
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">Sign up</h1>
            <div className="w-full flex-1 mt-8">
              <div className="flex flex-col items-center">
                <button className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                  <div className="bg-white p-2 rounded-full">
                    <svg className="w-4" viewBox="0 0 533.5 544.3">
                      <path
                        d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                        fill="#4285f4"
                      />
                      <path
                        d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                        fill="#34a853"
                      />
                      <path
                        d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                        fill="#fbbc04"
                      />
                      <path
                        d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                        fill="#ea4335"
                      />
                    </svg>
                  </div>
                  <span className="ml-4">Sign Up with Google</span>
                </button>
              </div>

              <div className="my-12 border-b text-center">
                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                  Or sign up with e-mail
                </div>
              </div>

              <div className="mx-auto max-w-xs">
                <input
                  type="text"
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mb-3"
                  name="name"
                  onChange={changeHandle}
                  required
                  value={signupData.name}
                  placeholder="Full Name"
                />
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  name="email"
                  required
                  onChange={changeHandle}
                  value={signupData.email}
                  placeholder="Email"
                />
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-3"
                  type="password"
                  name="password"
                  onChange={changeHandle}
                  required
                  value={signupData.password}
                  placeholder="Password"
                />
                <input
                  type="password"
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-3"
                  name="confirm_password"
                  onChange={changeHandle}
                  value={signupData.confirm_password}
                  required
                  placeholder="Confirm Password"
                />
                <select
                  name="batch"
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-3"
                  onChange={changeHandle}
                  value={signupData.batch}
                  required
                >
                  <option value="uniques 1.0">uniques 1.0</option>
                  <option value="uniques 2.0">uniques 2.0</option>
                  <option value="uniques 3.0">uniques 3.0</option>
                  <option value="super 60">super 60</option>
                </select>

                <button
                  onClick={submitHandle}
                  type="submit"
                  className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                >
                  <svg
                    className="w-6 h-6 -ml-2"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                  <span className="ml-3">Sign Up</span>
                </button>
                <p className="mt-6 text-xs text-gray-600 text-center">
                  Already have an account? -{" "}
                  <Link to="/login">
                    <span className="no-underline text-lg text-indigo-500 border-b border-blue text-blue">
                      Log in
                    </span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url(https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg)",
            }}
          ></div>
        </div>
      </div>
    </div>
    // <div className="bg-grey-lighter min-h-screen flex flex-col bg-slate-200">
    //   <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
    //     <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
    //       <h1 className="mb-8 text-3xl text-center">Sign up</h1>
    //       <input
    //         type="text"
    //         className="block border border-grey-light w-full p-3 rounded mb-4"
    //         name="name"
    //         onChange={changeHandle}
    //         required
    //         value={signupData.name}
    //         placeholder="Full Name"
    //       />

    //       <input
    //         type="text"
    //         className="block border border-grey-light w-full p-3 rounded mb-4"
    //         name="email"
    //         required
    //         onChange={changeHandle}
    //         value={signupData.email}
    //         placeholder="Email"
    //       />

    //       <input
    //         type="password"
    //         className="block border border-grey-light w-full p-3 rounded mb-4"
    //
    //         placeholder="Password"
    //       />
    //       <input
    //         type="password"
    //         className="block border border-grey-light w-full p-3 rounded mb-4"
    //         name="confirm_password"
    //         onChange={changeHandle}
    //         value={signupData.confirm_password}
    //         required
    //         placeholder="Confirm Password"
    //       />
    //       <select
    //         name="batch"
    //         className="block border border-grey-light w-full p-3 rounded mb-4"
    //         onChange={changeHandle}
    //         value={signupData.batch}
    //         required
    //       >
    //         <option value="uniques 1.0">uniques 1.0</option>
    //         <option value="uniques 2.0">uniques 2.0</option>
    //         <option value="uniques 3.0">uniques 3.0</option>
    //         <option value="super 60">super 60</option>
    //       </select>

    //       <button
    //         type="submit"
    //         onClick={submitHandle}
    //         className="w-full text-center py-3 rounded bg-blue-600 text-white hover:bg-green-dark focus:outline-none my-1"
    //       >
    //         Create Account
    //       </button>

    //       <div className="text-center text-sm text-grey-dark mt-4">
    //         By signing up, you agree to the
    //         <a
    //           className="no-underline border-b border-grey-dark text-grey-dark"
    //           href="#"
    //         >
    //           Terms of Service
    //         </a>{" "}
    //         and
    //         <a
    //           className="no-underline border-b border-grey-dark text-grey-dark"
    //           href="#"
    //         >
    //           Privacy Policy
    //         </a>
    //       </div>
    //     </div>

    //     <div className="text-grey-dark mt-6">
    //       Already have an account?
    //       <Link to="/login">
    //         <span className="no-underline border-b border-blue text-blue">
    //           Log in
    //         </span>
    //       </Link>
    //       .
    //     </div>
    //   </div>
    // </div>
  );
};

export default Signup;
