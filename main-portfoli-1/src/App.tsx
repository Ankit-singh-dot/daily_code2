import { useState } from "react";
import Body from "./components/Body";
import Sidebar from "./components/Sidebar";
import "./App.css";

const App = () => {
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);
  return (
    <div className="overflow-hidden ">
      <div className="flex relative">
        <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
        <Body openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
      </div>
    </div>
  );
};

export default App;
