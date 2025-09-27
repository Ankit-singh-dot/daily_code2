import { mainData } from "../assets/data";
import { motion } from "framer-motion";
const Main = () => {
  return (
    <div id="" className="flex flex-col w-[98%] mx-auto h-screen mt-10 ">
      <div className="my-1 mt-[6rem] lg:mt-0">
        <h6>&lt;h1&gt;</h6>
        <div className="flex flex-col w-[98%] mx-auto">
          <div className="flex text-[45px] md:text-[85px] leading-[3rem] md:leading-[5rem] tracking-tight font-[900] text-white">
            {mainData.firstLine.split("").map((letter, idx) => (
              <motion.h1
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                  scale: [1, 1.2, 1],
                  transition: {
                    // type: "spring",
                    stiffness: 300,
                    delay: idx * 0.1,
                  },
                }}
                whileHover={{
                  color: "#5DECCC",
                  scaleY: [1, 0.9, 0.8, 0.7, 1.3, 1],
                  scaleX: [1, 1.1, 1.2, 1.3, 0.7, 1],
                  transition: {
                    stiffness: 100,
                    damping: 30,
                    duration: 0.5,
                  },
                }}
                className=""
                key={idx}
              >
                {letter}
              </motion.h1>
            ))}
          </div>
          <div className="flex text-[45px] md:text-[85px] leading-[3rem] md:leading-[5rem] tracking-tight font-[900] text-white ">
            {mainData.secondLine.split("").map((letter, idx) => (
              <div key={idx}>
                {letter === "-" ? (
                  <h1 className="" key={idx}>
                    &nbsp;
                  </h1>
                ) : (
                  <motion.h1
                    style={
                      letter === "T"
                        ? {
                            textShadow: "-10px 0px 5px #04fcd8",
                            color: "#fd2155",
                          }
                        : {}
                    }
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                      scale: [1, 1.2, 1],
                      transition: {
                        // type: "spring",
                        stiffness: 300,
                        delay: (idx + 3) * 0.1,
                      },
                    }}
                    whileHover={{
                      color: letter === "T" ? "#fd2155" : "#5DECCC",
                      scaleY: [1, 0.9, 0.8, 0.7, 1.3, 1],
                      scaleX: [1, 1.1, 1.2, 1.3, 0.7, 1],
                      transition: {
                        stiffness: 500,
                        damping: 30,
                        duration: 0.5,
                      },
                    }}
                    className=""
                    key={idx}
                  >
                    {letter}
                  </motion.h1>
                )}
              </div>
            ))}
          </div>
          <div className="flex text-[45px] md:text-[85px] leading-[4rem] md:leading-[7rem] tracking-tight font-[900] text-white">
            {mainData.thirdLine.split("")?.map((letter, idx) => (
              <div key={idx}>
                {letter === "-" ? (
                  <h1 className="" key={idx}>
                    &nbsp;
                  </h1>
                ) : (
                  <motion.h1
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                      scale: [1, 1.2, 1],
                      transition: {
                        // type: "spring",
                        stiffness: 300,
                        delay: (idx + 12) * 0.1,
                      },
                    }}
                    whileHover={{
                      color: "#5DECCC",
                      scaleY: [1, 0.9, 0.8, 0.7, 1.3, 1],
                      scaleX: [1, 1.1, 1.2, 1.3, 0.7, 1],
                      transition: {
                        stiffness: 500,
                        damping: 30,
                        duration: 0.5,
                      },
                    }}
                    className=""
                    key={idx}
                  >
                    {letter}
                  </motion.h1>
                )}
              </div>
            ))}
          </div>
        </div>
        <h6>&lt;/h1&gt;</h6>
      </div>
      <motion.div
        initial={{ opacity: 0, translateY: "40%" }}
        animate={{
          opacity: 1,
          translateY: "0",
          transition: {
            delay: 0.8,
            duration: 0.5,
          },
        }}
        className="my-1"
      >
        <h6>&lt;p&gt;</h6>
        <div className="flex flex-col w-[98%] mx-auto">
          <h1 className="text-primaryLight text-[16px] md:text-[20px] tracking-[0.2rem]">
            {mainData.subHeading}
          </h1>
        </div>
        <h6>&lt;/p&gt;</h6>
      </motion.div>
      <div className="ml-[10px] lg:ml-[30px] mt-10 ">
        <a href="#contact">
          <motion.button
            initial={{ opacity: 0, translateY: "40%" }}
            animate={{
              opacity: 1,
              translateY: "0",
              transition: {
                delay: 1.2,
                duration: 0.4,
              },
            }}
            className="buttonFlow "
          >
            Contact me!
          </motion.button>
        </a>
      </div>
    </div>
  );
};

export default Main;
