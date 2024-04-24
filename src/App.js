import React from "react";
import Login from "./components/Login";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Signup from "./components/Signup";
import Student from "./components/Student";
import Admin from "./components/Admin";
import Fine from "./components/Fine";
import Admission from "./components/Admission";
import Event from "./components/Event";
import Sample from "./components/Sample";

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: <Signup />,
    },
    {
      path: "/admin",
      element: <Admin />,
      children: [
        {
          path: "/admin/",
          element: <Fine />,
        },
        {
          path: "/admin/published",
          element: <Admission />,
        },
        {
          path: "/admin/profile",
          element: <Event />,
        },
        {
          path: "/admin/notification",
          element: <Sample />,
        },
      ],
    },
    {
      path: "/student",
      element: <Student />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
