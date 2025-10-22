import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
export default function TextLoop({ fontSize, fontWeight }) {
  const texts = ["eth", "solana", "alchemy", "coinbase"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const transitionDelay = 3000;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, transitionDelay);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="overflow-hidden inline-block align-text-bottom -mx-2">
      <AnimatePresence mode="wait">
        <motion.p
          key={texts[currentIndex]}
          initial={{ opacity: 0, y: 50, rotate: 15 }}
          animate={{
            opacity: 1,
            y: 0,
            rotate: 0,
            transition: { duration: 0.8 },
          }}
          exit={{
            opacity: 0,
            y: -50,
            rotate: 15,
            transition: { duration: 0.5 },
          }}
          className={`inline-block ${
            currentIndex % 2 == 0 ? "text-blue-500" : "text-orange-500"
          } ${fontSize} ${fontWeight}`}
        >
          {texts[currentIndex]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
