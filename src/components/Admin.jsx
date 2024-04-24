import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const Admin = () => {
  const [par, setPar] = useState("admin/");

  const bg =
    par === "admin/"
      ? "mb-5 mt-2 text-xl py-2 mx-2 cursor-pointer hover:bg-gray-100 bg-gray-100"
      : "mb-5 mt-2 text-xl py-2 mx-2 cursor-pointer hover:bg-gray-100";
  const bgg =
    par === "published"
      ? "mb-5 mt-2 text-xl py-2 mx-2 cursor-pointer hover:bg-gray-100 bg-gray-100"
      : "mb-5 mt-2 text-xl py-2 mx-2 cursor-pointer hover:bg-gray-100";
  const bggg =
    par === "profile"
      ? "mb-5 mt-2 text-xl py-2 mx-2 cursor-pointer hover:bg-gray-100 bg-gray-100"
      : "mb-5 mt-2 text-xl py-2 mx-2 cursor-pointer hover:bg-gray-100";

  const paraa = (par) => {
    setPar(par);
  };

  return (
    <div className="">
      <div className="w-full h-[max-conent] py-6 border-b  px-3 flex justify-center items-center">
        <p className="text-xl">Notice Mangement Section.</p>
      </div>
      <div className="fixed bottom-0 right-0 left-0 top-[75px] px-2 py-4 grid grid-cols-12">
        <div className="col-span-2 text-center sticky top-0">
          <Link
            to="/admin/"
            onClick={() => {
              paraa("admin/");
            }}
          >
            <p className={bg}>Draft a Notice</p>
          </Link>
          <Link
            to="/admin/published"
            onClick={() => {
              paraa("published");
            }}
          >
            <p className={bgg}>Published Notice</p>
          </Link>
          <Link
            to="/admin/profile"
            onClick={() => {
              paraa("profile");
            }}
          >
            <p className={bggg}>Profile</p>
          </Link>
        </div>
        <div className=" col-span-10 overflow-scroll bg-gray-100 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;
