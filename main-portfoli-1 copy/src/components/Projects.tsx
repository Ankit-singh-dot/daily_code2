import { useState } from "react";
import { motion } from "framer-motion";
import { projectsData } from "../assets/data";
import React from "react";
import parse from "html-react-parser";

type ProjectProps = { link: string; img: string; idx: number };

const Project = ({ link, img, idx }: ProjectProps) => {
  const [show, setShow] = useState(false);
  return (
    <div
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      key={idx}
      className={`relative w-full h-[11rem] md:h-[14rem] lg:h-[17rem] cursor-pointer overflow-hidden  `}
    >
      <div
        className={`absolute top-0 left-0 w-full h-full z-[4] flex items-center justify-center ${
          show ? "opacity-100" : "opacity-0"
        } duration-200 transition-all`}
      >
        <a
          href={link}
          rel="noreferrer"
          target="_blank"
          className="text-black bg-secondary  w-[100px] h-[100px] rounded-full break-words flex items-center justify-center text-center"
        >
          View
          <br />
          Project
        </a>
      </div>
      <div
        className={`bg-[#111111] absolute top-0 left-0 w-full h-full ${
          show ? "opacity-0" : "opacity-70"
        } z-[3] duration-200 transition-all`}
      ></div>
      <img
        src={img}
        className={`absolute w-full h-full object-cover  ${
          show ? "scale-110" : "scale-100"
        } duration-200 transition-all z-2`}
        alt=""
      />
    </div>
  );
};
const Projects = () => {
  return (
    <>
      <div id="projects" className="flex flex-col w-[98%] mx-auto space-y-3 ">
        <h6>&lt;div&gt;</h6>
        <div className="flex flex-col w-[98%] mx-auto relative">
          <div className="absolute z-[1] flex items-center justify-end top-0 text-[rgba(255,255,255,0.04)] right-[-65%] h-full text-[20rem]">
            <p>PROJECTS</p>
          </div>
          <div className="z-[10]">
            <h6>&lt;h2&gt;</h6>
            <div className="flex flex-col w-[98%] mx-auto">
              <div className="flex items-center text-[40px] md:text-[65px] font-extrabold">
                <>
                  {projectsData.number?.split("").map((letter, idx) => (
                    <motion.h2
                      initial={{
                        opacity: 0,
                      }}
                      whileInView={{
                        opacity: 1,
                        scale: [1, 1.2, 1],
                        transition: {
                          // type: "spring",
                          stiffness: 300,
                          delay: idx * 0.1,
                        },
                      }}
                      viewport={{ once: true }}
                      whileHover={{
                        // color: "#5DECCC",
                        scaleY: [1, 0.9, 0.8, 0.7, 1.3, 1],
                        scaleX: [1, 1.1, 1.2, 1.3, 0.7, 1],
                        transition: {
                          stiffness: 100,
                          damping: 30,
                          duration: 0.5,
                        },
                      }}
                      className="text-white"
                      key={idx}
                    >
                      {letter}
                    </motion.h2>
                  ))}
                  <p className="w-3"></p>
                  {projectsData.title?.split("").map((letter, idx) => (
                    <motion.h2
                      initial={{
                        opacity: 0,
                      }}
                      whileInView={{
                        opacity: 1,
                        scale: [1, 1.2, 1],
                        transition: {
                          // type: "spring",
                          stiffness: 300,
                          delay: (idx + 3) * 0.1,
                        },
                      }}
                      viewport={{ once: true }}
                      whileHover={{
                        // color: "#5DECCC",
                        scaleY: [1, 0.9, 0.8, 0.7, 1.3, 1],
                        scaleX: [1, 1.1, 1.2, 1.3, 0.7, 1],
                        transition: {
                          stiffness: 100,
                          damping: 30,
                          duration: 0.5,
                        },
                      }}
                      className="text-secondary"
                      key={idx}
                    >
                      {letter == "/" ? parse("<span>&nbsp;</span>") : letter}
                    </motion.h2>
                  ))}
                </>
              </div>
            </div>
            <h6>&lt;/h2&gt;</h6>
          </div>
          <div className="z-[10]">
            <h6>&lt;p&gt;</h6>
            <div className="flex flex-col w-[91%] lg:w-[98%] mx-auto">
              <p className="text-white w-full lg:w-[70%] text-base">
                {projectsData.desc}
              </p>
            </div>
            <h6>&lt;/p&gt;</h6>
          </div>
        </div>
        <h6>&lt;/div&gt;</h6>
      </div>
      <div className="flex flex-col w-[98%] mx-auto space-y-3">
        <h6>&lt;section&gt;</h6>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
          {projectsData.projectList.map((project, idx) => (
            <div key={idx} className="">
              <Project link={project.link} img={project.img} idx={idx} />
            </div>
          ))}
        </div>
        <h6>&lt;/section&gt;</h6>
      </div>
    </>
  );
};

export default Projects;
