import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import AddUser from "./AddUser";

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [model, setModel] = useState(false);
  const chartConfig = {
    type: "pie",
    width: 380,
    height: 280,
    series: [
      users
        .filter((user) => user.role === "Student")
        .filter((user) => user.batch === "uniques 1.0").length,
      users
        .filter((user) => user.role === "Student")
        .filter((user) => user.batch === "uniques 2.0").length,
      users
        .filter((user) => user.role === "Student")
        .filter((user) => user.batch === "uniques 3.0").length,
      users
        .filter((user) => user.role === "Student")
        .filter((user) => user.batch === "super 60").length,
    ],
    labels: ["Uniques 1.0", "Uniques 2.0", "Uniques 3.0", "Super 60"],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#020617", "#ff8f00", "#00897b", "#1e88e5"],
      legend: {
        show: false,
        labels: {
          colors: "#000", // Color of legend text
          useSeriesColors: true, // Set to true if you want legend colors to match series colors
        },
      },
    },
  };

  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:9000/${id}`);
      setUsers(response.data.users);
      toast.success(response.data.message);
    } catch (e) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      const response = await axios.get("http://localhost:9000/getusers");
      setUsers(response.data.users);
    };
    getUsers();
  }, []);

  return (
    <div className="p-2">
      {model && (
        <div className="fixed top-0 left-0  right-0 bottom-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div onClick={()=>setModel((prev)=>!prev)} className="text-white text-4xl shadow-sm  cursor-pointer absolute right-10 top-10">X</div>
          <div className="bg-white p-4 w-[400px] rounded-lg">
            <AddUser setModel={setModel}/>
          </div>
        </div>
      
      )}
      <div className="flex flex-wrap   justify-around items-center">
        <div>
          <h1 className="text-2xl flex justify-between font-semibold py-2 ms-2 text-gray-900">
            Manage Student <button onClick={()=>setModel((prev)=>!prev)} className="text-white me-2 bg-black hover:bg-slate-500 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-4 py-2 text-center">Add user</button>
          </h1>
          <table class=" divide-y w-[50%] divide-gray-200 overflow-x-auto">
            <thead class="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Batch
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Role
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              {users
                .filter((user) => user.role === "Student")
                .map((user) => (
                  <tr>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">
                            {user.name}
                          </div>
                          <div class="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">{user.batch}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.role}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.email}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap  text-sm font-medium">
                      <button
                        onClick={() => deleteUser(user._id)}
                        class="ml-2 text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="w-[450px] mt-11 rounded-lg bg-white">
          <div className="relative">
            <h1 className="text-2xl  font-semibold py-2 ms-7 text-gray-900">
              Batch Distribution
            </h1>
            <div className="flex justify-end right-3 text-sm flex-col absolute z-[2] flex-wrap gap-[10px]">
              <p className="text-[#020617]">
                {" "}
                <span className="w-[20px] inline-block h-[10px] bg-[#020617]"></span>{" "}
                Uniques 1.0
              </p>
              <p className="text-[#ff8f00]">
                {" "}
                <span className="w-[20px] inline-block h-[10px] bg-[#ff8f00]"></span>{" "}
                Uniques 2.0
              </p>
              <p className="text-[#00897b]">
                {" "}
                <span className="w-[20px] inline-block h-[10px] bg-[#00897b]"></span>{" "}
                Uniques 3.0
              </p>
              <p className="text-[#1e88e5]">
                {" "}
                <span className="w-[20px] inline-block h-[10px] bg-[#1e88e5]"></span>{" "}
                Super 60
              </p>
            </div>
          </div>
          <Card>
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
            ></CardHeader>
            <CardBody className="mt-4 grid place-items-center px-2">
              <Chart {...chartConfig} />
            </CardBody>
          </Card>
        </div>
      </div>
      <div className="mt-[50px]">
        <h1 className="text-2xl flex justify-between font-semibold py-2 ms-2 text-gray-900">
          Manage Admin <button onClick={()=>setModel((prev)=>!prev)}  className="text-white me-2 bg-black hover:bg-slate-500 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-4 py-2 text-center">Add user</button>
        </h1>
        <table class=" divide-y min-w-full divide-gray-200 overflow-x-auto">
          <thead class="bg-gray-50">
            <tr>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Name
              </th>

              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Role
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Email
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            {users
              .filter((user) => user.role === "Admin")
              .map((user) => (
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                        <div class="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>

                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Active
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.role}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.email}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap  text-sm font-medium">
                    <button
                      onClick={() => deleteUser(user._id)}
                      class="ml-2 text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUser;
