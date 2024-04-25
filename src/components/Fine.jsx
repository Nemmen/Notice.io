import React from "react";
import bg from "../assets/bgtu.jpg";
import bgac from "../assets/bgac.png";
import { Link } from "react-router-dom";
import TempCard from "./materialui/Tempcard";

const Fine = () => {
  return (
    <div className="flex justify-center gap-[20px] py-5">
      {/* <div className="flex flex-col items-center  border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl bg-gray-100 ">
        <img src={bg} width={200} className=" object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" alt="" />
        <Link to="/admin/notification" className="p-2" >
          {" "}
          <p className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Give a notification </p>
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
      </div> */}
      <TempCard title='Alerts' batch="The Uniques" image={bg} year="2024" content="The template is for the uniques batch" />
      <TempCard title='Notice' batch="SVIET Academics" image={bgac} year="2024" content="The template is for the academic year notice and guidelines" />
    </div>
  );
};

export default Fine;
