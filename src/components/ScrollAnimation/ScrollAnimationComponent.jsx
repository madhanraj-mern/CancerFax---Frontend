import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

const ScrollAnimationComponent = ({ children, animationVariants, delay = 0 }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [ref, inView] = useInView({
    // triggerOnce: true, // uncomment if you want it only once
    threshold: 0.2, // 20% of the component is visible
    triggerOnce: false, // Allow re-triggering on scroll
    rootMargin: "0px 0px -50px 0px", // Start animation slightly before element is fully visible
  });

  // Ensure component is mounted on client side (fixes SSR issues)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Default variants if none provided
  const defaultVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const variants = animationVariants || defaultVariants;

  // If not mounted yet, render without animation (SSR safe)
  if (!isMounted) {
    return <div style={{ height: "100%" }}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={inView ? "isactive" : "hidden"}
      variants={variants}
      transition={{ 
        duration: 0.5, 
        ease: "easeInOut", 
        delay,
        type: "tween" // Use tween for better performance
      }}
      style={{ 
        height: "100%",
        willChange: "transform, opacity" // Optimize for animations
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimationComponent;
