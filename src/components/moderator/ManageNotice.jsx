import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";

const ManageNotice = () => {
  const [unique, setUnique] = useState([]);
  const [acadmic, setAcadmic] = useState([]);
  const [user, setUser] = useState([]);

  const deleteUnique = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:9000/notice/unique/${id}`
      );
      setUnique(response.data.unique);
      toast.success(response.data.message);
    } catch (e) {
      toast.error("An error occurred while deleting the uniques notice");
    }
  };

  const deleteAcadmic = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:9000/notice/acadmic/${id}`
      );
      setAcadmic(response.data.acadmic);
      toast.success(response.data.message);
    } catch (e) {
      toast.error("An error occurred while deleting the Acadmic notice");
    }
  };

  useEffect(() => {
    const notice = async () => {
      try {
        const response3 = await axios.get("http://localhost:9000/getusers");
        setUser(response3.data.users);
        const response = await axios.get(
          "http://localhost:9000/notice/getnotice"
        );
        const response1 = await axios.get(
          "http://localhost:9000/notice/getacadmic"
        );
        setAcadmic(response1.data);
        setUnique(response.data);
        toast.success(response.data.message);
      } catch (err) {
        toast.error(err.response.data.message);
      }
    };
    notice();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 px-4 mt-8 sm:grid-cols-4 sm:px-8">
        <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
          <div className="p-4 bg-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              ></path>
            </svg>
          </div>
          <div className="px-4 text-gray-700">
            <h3 className="text-sm tracking-wider">Total Teacher</h3>
            <p className="text-3xl">
              {user.filter((item) => item.role === "Admin").length}
            </p>
          </div>
        </div>
        <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
          <div className="p-4 bg-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
              ></path>
            </svg>
          </div>
          <div className="px-4 text-gray-700">
            <h3 className="text-sm tracking-wider">Total Notice</h3>
            <p className="text-3xl">{acadmic.length + unique.length}</p>
          </div>
        </div>
        <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
          <div className="p-4 bg-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
              ></path>
            </svg>
          </div>
          <div className="px-4 text-gray-700">
            <h3 className="text-sm tracking-wider">Uniques Notice</h3>
            <p className="text-3xl">{unique.length}</p>
          </div>
        </div>
        <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
          <div className="p-4 bg-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
              ></path>
            </svg>
          </div>
          <div className="px-4 text-gray-700">
            <h3 className="text-sm tracking-wider">Acadmic Notice</h3>
            <p className="text-3xl">{acadmic.length}</p>
          </div>
        </div>
      </div>
      <div className="p-8">
        <div className="py-4 px-4 bg-white">
          <h1 className="text-2xl font-semibold text-gray-900 border-b pb-2 border-black">
            Uniques Notice
          </h1>
        </div>
        {unique.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between px-4 py-2 border-x-[1px] border-b-[1px] bg-white"
          >
            <div className="flex space-x-4 ">
              <div className="flex flex-col space-y-1">
                <p className="font-semibold">{item.title}</p>
                <span>
                  <p className="text-sm text-slate-500">ID: {item._id}</p>
                </span>
              </div>
            </div>
            <div className="flex flex-col space-y-1">
              <span>
                <p className="text-sm text-slate-500">
                  {moment(item.data).format("DD/MM/YYYY")}
                </p>
              </span>
              {/* <span><p className='text-sm text-slate-500'>{item.place}</p></span> */}
            </div>
            <div className="flex space-x-4 md:w-[16rem] justify-between">
              <div className="flex flex-col space-y-1">
                <span>
                  <p className="text-sm text-slate-500">The unique</p>
                </span>
              </div>
              <button className="rounded-2xl bg-green-600 px-2 py-1 text-white text-[12px] font-medium h-6">
                Edit User
              </button>
              <button onClick={()=>deleteUnique(item._id)} className="rounded-2xl bg-red-600 px-2 py-1 text-white text-[12px] font-medium h-6">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="p-8">
        <div className="py-4 px-4 bg-white">
          <h1 className="text-2xl font-semibold text-gray-900 border-b pb-2 border-black">
            Acadmic Notice
          </h1>
        </div>
        {acadmic.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between px-4 py-2 border-x-[1px] border-b-[1px] bg-white"
          >
            <div className="flex space-x-4 ">
              <div className="flex flex-col space-y-1">
                <p className="font-semibold">{item.title}</p>
                <span>
                  <p className="text-sm text-slate-500">ID: {item._id}</p>
                </span>
              </div>
            </div>
            <div className="flex flex-col space-y-1">
              <span>
                <p className="text-sm text-slate-500">
                  {moment(item.data).format("DD/MM/YYYY")}
                </p>
              </span>
              {/* <span><p className='text-sm text-slate-500'>{item.place}</p></span> */}
            </div>
            <div className="flex space-x-4 md:w-[16rem] justify-between">
              <div className="flex flex-col space-y-1">
                <span>
                  <p className="text-sm text-slate-500">Acadmic</p>
                </span>
              </div>
              <button className="rounded-2xl bg-green-600 px-2 py-1 text-white text-[12px] font-medium h-6">
                Edit User
              </button>
              <button onClick={()=>deleteAcadmic(item._id)} className="rounded-2xl bg-red-600 px-2 py-1 text-white text-[12px] font-medium h-6">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageNotice;
