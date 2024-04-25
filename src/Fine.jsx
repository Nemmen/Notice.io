import React from "react";
import bg from "../assets/bgtu.jpg";
import bgac from "../assets/bgac.png";
import { Link } from "react-router-dom";

const Fine = () => {
  return (
    <div className="flex justify-center">
      <div className=" text-center relative mt-[60px] ms-[60px] w-[200px]">
        <img src={bg} width={200} className=" object-cover" alt="" />
        <Link to="/admin/notification">
          {" "}
          <button className="bg-red-500 mt-2  hover:bg-red-700 mx-2 text-white font-bold py-2 px-4 rounded">
            Use Template
          </button>
        </Link>
      </div>
      <div className=" text-center relative mt-[60px] ms-[60px] w-[200px]">
        <img src={bgac} width={200} className=" object-cover" alt="" />
        <Link to="/admin/academic">
          {" "}
          <button className="bg-red-500 mt-2  hover:bg-red-700 mx-2 text-white font-bold py-2 px-4 rounded">
            Use Template
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Fine;
