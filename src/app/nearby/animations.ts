// src/animations/bounceVariants.ts
import { Variants } from "framer-motion";

export const bounceVariants: Variants = {
  visible: {
    y: [0, -8, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
    },
  },
};
