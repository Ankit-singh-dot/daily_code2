import { AiOutlineArrowRight } from "react-icons/ai";
import Main from "./Main";
import MySkills from "./MySkills";
import Work from "./Work";
import { motion } from "framer-motion";
import Projects from "./Projects";
import About from "./About";
import Contact from "./Contact";
type BodyProps = {
  openSidebar: boolean;
  setOpenSidebar: (value: boolean) => void;
};
const Body = ({ openSidebar, setOpenSidebar }: BodyProps) => {
  return (
    <div className="xl:flex-[0.9] bg-primary h-screen overflow-y-scroll overflow-x-hidden relative scroll-smooth">
      <div
        onClick={() => setOpenSidebar(!openSidebar)}
        className="fixed z-[100] top-4 right-4 h-[3rem] w-[3rem] bg-[#111111] rounded-sm flex xl:hidden flex-col justify-between p-[10px] cursor-pointer"
      >
        <motion.div
          initial={{ rotate: 0, translateY: "0" }}
          animate={{
            rotate: openSidebar ? 45 : 0,
            translateY: openSidebar ? "12.6px" : "0",
          }}
          className="w-full h-[3px] bg-[#ffffff]"
        ></motion.div>
        <motion.div
          initial={{ rotate: 0, opacity: 100 }}
          animate={{
            rotate: openSidebar ? 45 : 0,
            opacity: openSidebar ? 0 : 100,
          }}
          className="w-full h-[3px] bg-[#ffffff]"
        ></motion.div>
        <motion.div
          initial={{ rotate: 0, translateY: "0" }}
          animate={{
            rotate: openSidebar ? 135 : 0,
            translateY: openSidebar ? "-12.6px" : "0",
          }}
          className="w-full h-[3px] bg-[#ffffff]"
        ></motion.div>
      </div>
      <div className="absolute  bottom-16 -left-9">
        <div className="flex space-x-3 text-sm md:text-base text-white items-center rotate-90  ">
          <motion.p
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            scroll down
          </motion.p>
          <AiOutlineArrowRight />
        </div>
      </div>
      <div className="absolute  bottom-16 -right-9">
        <div className="flex space-x-3 text-sm md:text-base text-white items-center rotate-90  ">
          <motion.p
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            scroll down
          </motion.p>
          <AiOutlineArrowRight />
        </div>
      </div>

      <div className="flex flex-col w-[95%] mx-auto my-4">
        <h6>&lt;html&gt;</h6>
        <div className="flex flex-col w-[98%] mx-auto">
          <h6>&lt;body&gt;</h6>
          <Main />
          <Projects />
          <About />
          <Work />
          <MySkills />
          <Contact />
          <h6>&lt;/body&gt;</h6>
        </div>
        <h6>&lt;/html&gt;</h6>
      </div>
    </div>
  );
};

export default Body;
