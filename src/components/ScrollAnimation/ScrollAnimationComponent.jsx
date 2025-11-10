import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const ScrollAnimationComponent = ({ children, animationVariants, delay = 0 }) => {
  const [ref, inView] = useInView({
    // triggerOnce: true, // uncomment if you want it only once
    threshold: 0.2, // 20% of the component is visible
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={inView ? "isactive" : "hidden"}
      variants={animationVariants}
      transition={{ duration: 0.5, ease: "easeInOut", delay }}
      style={{ height: "100%" }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimationComponent;
