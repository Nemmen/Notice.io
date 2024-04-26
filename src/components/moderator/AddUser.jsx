import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddUser = ({ setModel }) => {
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Student",
    batch: "",
    confirm_password: "",
  });

  const changeHandle = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };
  const submitHandle = async () => {
    console.log(signupData);
    if (signupData.password !== signupData.confirm_password) {
      return toast.error("password !== confirm password does not match");
    }
    if (signupData.role === "Student" && signupData.batch === "") {
      return toast.error("batch is required");
    }
    try {
      const response = await axios.post(
        "http://localhost:9000/signup",
        signupData
      );
      setModel((prev) => !prev);
      toast.success("User added successfully");
    } catch (err) {
      toast.error(err.response.data.Message);
    }
  };

  return (
    <div className="">
      <div className="">
        <div className="">
          <h1 className="mb-8 text-3xl text-center">Add User</h1>
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="name"
            onChange={changeHandle}
            required
            value={signupData.name}
            placeholder="Full Name"
          />

          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="email"
            required
            onChange={changeHandle}
            value={signupData.email}
            placeholder="Email"
          />

          <input
            type="password"
            name="password"
            value={signupData.password}
            onChange={changeHandle}
            className="block border border-grey-light w-full p-3 rounded mb-4"
            placeholder="Password"
          />
          <input
            type="password"
            name="confirm_password"
            value={signupData.confirm_password}
            onChange={changeHandle}
            className="block border border-grey-light w-full p-3 rounded mb-4"
            placeholder="confirm_password"
          />
          <select
            name="role"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            onChange={changeHandle}
            value={signupData.role}
            required
          >
            <option value="Student">Student</option>
            <option value="Admin">Admin</option>
          </select>
          {signupData.role === "Student" && (
            <select
              name="batch"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              onChange={changeHandle}
              value={signupData.batch}
              required
            >
              <option value="">chose_Batch </option>
              <option value="uniques 1.0">uniques 1.0</option>
              <option value="uniques 2.0">uniques 2.0</option>
              <option value="uniques 3.0">uniques 3.0</option>
              <option value="super 60">super 60</option>
            </select>
          )}

          <button
            type="submit"
            onClick={submitHandle}
            className="w-full text-center py-3 rounded bg-blue-600 text-white hover:bg-green-dark focus:outline-none my-1"
          >
            Add user
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
