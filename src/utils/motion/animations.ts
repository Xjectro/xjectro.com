import { Variants } from "framer-motion";

export const fadeInUp = (delay: number = 0): Variants => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      delay,
    },
  },
});

export const staggerChildren = (staggerTime: number = 0.1): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerTime,
    },
  },
});

export const scaleOnHover: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 10,
    },
  },
};

export const buttonHover: Variants = {
  initial: { scale: 1, y: 0 },
  hover: {
    scale: 1.05,
    y: -2,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
};

export const cardHover: Variants = {
  initial: {
    scale: 1,
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  hover: {
    scale: 1.02,
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15,
    },
  },
};

export const imageZoom: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.1,
      ease: "easeOut",
    },
  },
};

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

export const cardVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export const listVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.12,
    },
  },
};
