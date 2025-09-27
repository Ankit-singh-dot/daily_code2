import { aboutData } from "../assets/data";
import TagSphere from "../utils/TagSphere";
import { motion } from "framer-motion";
import parse from "html-react-parser";
const About = () => {
  return (
    <div id="about" className="flex flex-col lg:grid lg:grid-cols-2 lg:pr-16">
      <div className="flex flex-col w-[98%] mx-auto space-y-3 self-center">
        <h6>&lt;div&gt;</h6>
        <div className="flex flex-col w-[98%] mx-auto space-y-4">
          <div className="">
            <h6>&lt;h2&gt;</h6>
            <div className="flex flex-col w-[98%] mx-auto">
              <div className="flex items-center text-[40px] md:text-[65px] font-extrabold">
                <>
                  {aboutData.number?.split("").map((letter, idx) => (
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
                  {aboutData.title?.split("").map((letter, idx) => (
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
                      {letter}
                    </motion.h2>
                  ))}
                </>
              </div>
            </div>
            <h6>&lt;/h2&gt;</h6>
          </div>
          <div className="">
            <h6>&lt;p&gt;</h6>
            <div className="flex flex-col w-full lg:w-[90%] mx-auto">
              {parse(aboutData.desc)}
            </div>
            <h6>&lt;/p&gt;</h6>
          </div>
        </div>
        <h6>&lt;/div&gt;</h6>
      </div>
      <div>
        <TagSphere />
      </div>
    </div>
  );
};

export default About;
