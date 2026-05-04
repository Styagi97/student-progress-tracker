import { useState } from "react";
import { useTasks } from "../../context/TaskContext";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import ProfileDialog from "../profile/ProfileDialog";

const Layout = ({ children, dark, setDark }) => {
  const [openProfile, setOpenProfile] = useState(false);

  const { tasks } = useTasks();
  return (
    <div className="flex min-h-screen bg-gray-100">
      
      <Sidebar tasks={tasks} />
      <div className="flex-1 ml-64 flex flex-col">
        
          <Navbar
            dark={dark}
            setDark={setDark}
            onProfileClick={() => setOpenProfile(true)}
          />

          <div className="p-4 flex-1 ">
            {children}
          </div>

          <ProfileDialog
            open={openProfile}
            onClose={() => setOpenProfile(false)}
          />
        </div>
     
    </div>
  );
};

export default Layout;
