import parse from "html-react-parser";
import { mySkillsData } from "../assets/data";
import SkillsProgressBar from "../utils/SkillsProgressBar";
import TagSphere from "../utils/TagSphere";
import { motion } from "framer-motion";

const MySkills = () => {
  return (
    <div
      id="skill"
      className="flex flex-col w-[98%] mx-auto space-y-3 self-center"
    >
      <h6>&lt;div&gt;</h6>
      <div className="flex flex-col w-[98%] mx-auto space-y-4">
        <div className="">
          <h6>&lt;h2&gt;</h6>
          <div className="flex flex-col w-[98%] mx-auto">
            <div className="flex items-center text-[45px] md:text-[65px] font-extrabold">
              <>
                {mySkillsData.number?.split("").map((letter, idx) => (
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
                {mySkillsData.title?.split("").map((letter, idx) => (
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
        <div className="flex flex-col lg:flex-row space-y-5 lg:space-y-0">
          <div className="lg:flex-[0.55]">
            <h6>&lt;p&gt;</h6>
            <p className="flex flex-col w-[96%] mx-auto">
              {parse(mySkillsData.desc)}
            </p>

            <h6>&lt;/p&gt;</h6>
          </div>
          <div className="space-y-7 lg:flex-[0.45]">
            {mySkillsData.skills.map((skill, idx) => (
              <motion.div
                initial={{ opacity: 0, translateX: "-10%" }}
                whileInView={{
                  opacity: 1,
                  translateX: "0",
                  transition: { duration: 0.5, delay: idx * 0.2 },
                }}
                viewport={{ once: true }}
                key={idx}
                className="flex flex-col space-y-2"
              >
                <p className="text-white">{skill.skill}</p>
                <SkillsProgressBar
                  index={idx}
                  color={skill.color}
                  progress={skill.progress}
                />
              </motion.div>
            ))}
          </div>
        </div>
        <h6>&lt;/div&gt;</h6>
      </div>
    </div>
  );
};

export default MySkills;
