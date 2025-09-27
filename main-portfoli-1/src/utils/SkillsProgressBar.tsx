import { useEffect, useState } from "react";
import { motion } from "framer-motion";
type SkillsProgressBarProps = {
  color: string;
  progress: number;
  index: number;
};
const SkillsProgressBar = ({
  color,
  progress,
  index,
}: SkillsProgressBarProps) => {
  // const [width, setWidth] = useState<number>(0);
  // useEffect(() => {
  //   setTimeout(() => {
  //     let counter = 0;
  //     const interval = setInterval(() => {
  //       counter += 1;
  //       setWidth(counter);
  //       if (counter === progress) {
  //         clearInterval(interval);
  //       }
  //     }, 10);
  //   }, 300 * index);
  // }, [index, progress]);

  return (
    <div className={`w-[100%] h-[4px] bg-[#012E3D]`}>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{
          width: `${progress}%`,
          transition: { duration: 0.5, delay: index * 0.2 },
        }}
        // viewport={{ once: true }}
        style={{
          backgroundColor: color,
        }}
        className="h-[2px]"
      ></motion.div>
    </div>
  );
};

export default SkillsProgressBar;
