import { useEffect, useState } from "react";
import TagCloud from "TagCloud";
import { mySkillsData } from "../assets/data";
const TagSphere = () => {
  const [myTags, setMyTags] = useState<string[]>(mySkillsData.words);
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

  useEffect(() => {
    TagCloud(".tagcloud", myTags, {
      radius: width <= 640 ? 150 : width <= 768 ? 200 : 330,

      maxSpeed: "fast",
      initSpeed: "fast",
      itemClass: "text-secondary text-xs md:text-xl lg:text-2xl font-bold ",
    });
  }, [myTags]);
  return (
    <div className="tagcloud flex items-center justify-center z-[10]"></div>
  );
};

export default TagSphere;
