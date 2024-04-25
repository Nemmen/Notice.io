import React, { useState } from "react";
import Login from "./components/Login";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Signup from "./components/Signup";
import Student from "./components/Student";
import Admin from "./components/Admin";
import Fine from "./components/Fine";
import Admission from "./components/Admission";
import Event from "./components/Event";
import Sample from "./components/Sample";
import Academic from "./components/Academic";
import ManageUser from "./components/moderator/ManageUser";
import ManageNotice from "./components/moderator/ManageNotice";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  const [user, setUser] = useState(null);

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login setUser={setUser} />,
    },
    {
      path: "/",
      element: <Signup />,
    },
    {
      path: "/admin",
      element: <Admin user={user} setUser={setUser} />,
      children: [
        {
          path: "/admin/",
          element: <Fine />,
        },
        {
          path: "/admin/published",
          element: <Admission user={user} />,
        },
        {
          path: "/admin/profile",
          element: <Event />,
        },
        {
          path: "/admin/notification",
          element: <Sample user={user} />,
        },
        {
          path: "/admin/academic",
          element: <Academic user={user} />,
        },
      ],
    },
    {
      path: "/moderator",
      element: <AdminDashboard user={user} setUser={setUser} />,
      children: [
        {
          path: "/moderator/",
          element: <ManageUser />,
        },
        {
          path: "/moderator/profile",
          element: <Event />,
        },
        {
          path: "/moderator/managenotice",
          element: <ManageNotice  user={user}/>,
        },
      ],
    },
    {
      path: "/student",
      element: <Student setUser={setUser} user={user} />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
