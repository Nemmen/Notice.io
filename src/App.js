import React , {useState} from "react";
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

function App() {
  const [user, setUser] = useState(null)
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
      element: <Admin />,
      children: [
        {
          path: "/admin/",
          element: <Fine  />,
        },
        {
          path: "/admin/published",
          element: <Admission  user={user}/>,
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
          path:"/admin/academic",
          element:<Academic user={user}/>
        }
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
