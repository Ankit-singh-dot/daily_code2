import logo from "../assets/logo.svg";
import { sidebarData } from "../assets/data";
import { useState, useEffect } from "react";
import { FaLinkedinIn } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { AiFillGithub } from "react-icons/ai";
import { motion } from "framer-motion";
type SidebarProps = {
  openSidebar: boolean;
  setOpenSidebar: (value: boolean) => void;
};
const Sidebar = ({ openSidebar, setOpenSidebar }: SidebarProps) => {
  const [width, setWidth] = useState<number>(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);
  return (
    <motion.div
      initial={{
        translateX: width >= 1280 ? "0" : openSidebar ? "0%" : "100%",
      }}
      animate={{
        translateX: width >= 1280 ? "0%" : openSidebar ? "0%" : "100%",
      }}
      className="xl:flex-[0.10] absolute top-0  z-[100] w-full xl:static h-screen bg-primaryLight flex items-center flex-col justify-between pb-8"
    >
      <a
        href=""
        className="flex flex-col items-center w-full space-y-4 py-8 bg-[#111111]"
      >
        <img
          onClick={() => setOpenSidebar(false)}
          src={logo}
          alt="Logo"
          className="cursor-pointer w-[75px] h-[75px]"
        />
        <p className="text-primaryLight text-[13px]">{sidebarData.subTitle}</p>
      </a>
      <div className="flex flex-col items-center w-full">
        {sidebarData.options.map((op, idx) => (
          <a
            onClick={() => setOpenSidebar(false)}
            href={`#${op.id}`}
            className="text-primaryLight cursor-pointer w-full text-center py-4 hover:text-secondary duration-300 transition-all  border-y-[1px] border-y-[#282828]"
            key={idx}
          >
            {op.title}
          </a>
        ))}
      </div>
      <div className="flex items-center space-x-4">
        <a
          onClick={() => setOpenSidebar(false)}
          href={sidebarData.links.find((arr) => arr.type === "linkedin")?.link}
          target="_blank"
          className="text-primaryLight hover:text-secondary transition-all duration-150"
          rel="noreferrer"
        >
          <FaLinkedinIn size={25} />
        </a>
        <a
          onClick={() => setOpenSidebar(false)}
          href={sidebarData.links.find((arr) => arr.type === "instagram")?.link}
          target="_blank"
          className="text-primaryLight hover:text-secondary transition-all duration-150"
          rel="noreferrer"
        >
          <AiFillInstagram size={25} />
        </a>
        <a
          onClick={() => setOpenSidebar(false)}
          href={sidebarData.links.find((arr) => arr.type === "github")?.link}
          target="_blank"
          className="text-primaryLight hover:text-secondary transition-all duration-150"
          rel="noreferrer"
        >
          <AiFillGithub size={25} />
        </a>
      </div>
    </motion.div>
  );
};

export default Sidebar;
