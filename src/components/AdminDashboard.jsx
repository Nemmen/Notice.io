import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import Navbar from "./materialui/Navbar";

const Admin = ({user , setUser}) => {
  const [par, setPar] = useState("moderator/");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/moderator/") {
      setPar("moderator/");
    }
    if (location.pathname === "/moderator/managenotice") {
      setPar("managenotice");
    }
    if (location.pathname === "/moderator/profile") {
      setPar("profile");
    }
  }, [location]);

  const bg = par === "moderator/" ? "bg-slate-200" : "";
  const bgg = par === "managenotice" ? "bg-slate-200" : "";
  const bggg = par === "profile" ? "bg-slate-200" : "";



  return (
    <div className="">
      <Navbar user={user}  setUser={setUser}/>
      <div className="fixed bottom-0 right-0 left-0 top-[75px] px-2 py-4 grid grid-cols-12">
        <div className="col-span-2 text-center sticky top-0">
          <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
            <List>
              <Link to="/moderator/" onClick={()=> setPar("moderator/")}>
                <ListItem className={bg}>
                  <ListItemPrefix>
                    <PresentationChartBarIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  Manage User
                </ListItem>
              </Link>
              <Link to="/moderator/managenotice"  onClick={()=> setPar("managenotice")}>
                <ListItem className={bgg}>
                  <ListItemPrefix>
                    <ShoppingBagIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  Manage Notice
                </ListItem>
              </Link>

              <Link to="/moderator/profile" onClick={()=> setPar("profile")}>
                <ListItem className={bggg}>
                  <ListItemPrefix>
                    <UserCircleIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  Profile
                </ListItem>
              </Link>
              <ListItem>
                <ListItemPrefix>
                  <Cog6ToothIcon className="h-5 w-5" />
                </ListItemPrefix>
                Settings
              </ListItem>
            </List>
          </Card>
        </div>
        <div className=" col-span-10 overflow-scroll bg-gray-100 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;
