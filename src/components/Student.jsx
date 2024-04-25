import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";
import bg from "../assets/bgtu.jpg";
import Navbar from "./materialui/Navbar";


const Student = () => {
  const [unique, setUnique] = useState([]);
  const [academic, setAcademic] = useState([]);

  useEffect(() => {
    const notice = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9000/notice/getnotice"
        );
        const response1 = await axios.get(
          "http://localhost:9000/notice/getacadmic"
        );
        setAcademic(response1.data);
        setUnique(response.data);
        toast.success(response.data.message);
      } catch (err) {
        toast.error(err.response.data.message);
      }
    };
    notice();
  }, []);

  return (
    <div className="bg-slate-200">
      <Navbar />
      <h1 className="text-3xl text-center my-3 py-3">Notification</h1>
      <div className="flex flex-wrap gap-3 justify-center">
        {unique.map((item, index) => (
          <div key={index}>
            <div
              className="mt4 relative"
              style={{
                background: `url(${bg})`,
                backgroundSize: "cover",
                width: "148mm",
                minHeight: "210mm",
                margin: "auto",
              }}
            >
              <p className="absolute top-[120px] left-[80px] text-[15px]">
                Ref. No: {item.reff}
              </p>
              <p className="absolute top-[120px] left-[390px] text-[15px]">
                Date:{moment(item.date).format("DD-MM-YYYY")}
              </p>
              <p className="absolute font-semibold text-2xl top-[220px] left-[230px]">
                NOTIFICATION
              </p>
              <p className="absolute top-[300px] left-[150px] w-[500px] bg-transparent h-[400px]">
                {item.description}
              </p>
            </div>
            <div className=" border-b border-black relative mt-[30px] left-[350px] w-[200px]">
              Posted By{" "}
              <span className=" text-red-500 font-bold">
                {item.postedBy[0].name}
              </span>
            </div>
          </div>
        ))}
      </div>
      <h1 className="text-3xl text-center mt-[150px] my-3 py-3">Acadmic notice</h1>
      <div className="flex flex-wrap gap-3 justify-center">
        {academic.map((item, index) => (
          <div key={index} className="mb-8">
            <div className="">
              <div
                className="p-9"
                style={{
                  width: "210mm",
                  margin: "auto",
                  backgroundColor: "white",
                }}
              >
                <div>
                  <h2 className="font-bold text-3xl">
                    Swami Vivekanand Group of Institutes,
                  </h2>
                  <p className="font-medium">
                    Chandigarh Patiala National Highway, Ram Nagar, Banur
                  </p>
                  <div className="w-full h-[1.5px] bg-slate-400" />
                  <div className="flex justify-between">
                    <div>{item.refValue}</div>
                    <div>{moment(item.dateValue).format("DD-MM-YYYY")}</div>
                  </div>
                </div>
                <div className="text-center mt-10">
                  <h2 className="text-lg font-bold underline">Notice</h2>
                </div>
                <div className="text-center mt-10 break-normal">
                  {item.descValue}
                </div>

                <div>
                  <p className="text-sm font-bold mt-[100px]">Principal</p>
                  <p className="text-sm font-bold ">SVIET</p>
                </div>
                <div className="mt-8">
                  <p className="text-sm underline font-bold">CC to:-</p>
                  <p className="text-sm">
                    Hon'ble Chairman/President for their kind information;
                  </p>
                  <p className="text-sm">All Directors/Principals;</p>
                  <p className="text-sm">All concerned Officials;</p>
                  <p className="text-sm">Notice Board;</p>
                  <p className="text-sm">Head of the Accounts.</p>
                </div>
              </div>
            </div>
            <div className=" border-b border-black relative mt-[30px] left-[550px] w-[200px]">
              Posted By{" "}
              <span className=" text-red-500 font-bold">
                {item.postedBy[0].name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Student;
