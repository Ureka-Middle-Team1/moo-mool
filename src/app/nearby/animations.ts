import { Variants } from "framer-motion";

export const bounceVariants: Variants = {
  visible: {
    scale: 1,
    opacity: 1,
    y: [0, -10, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
    },
  },
  hidden: {
    scale: 0,
    opacity: 0,
  },
};
