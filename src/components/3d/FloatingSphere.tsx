import { motion } from "framer-motion";

interface FloatingSphereProps {
  size?: number;
  delay?: number;
  className?: string;
}

export const FloatingSphere = ({ size = 100, delay = 0, className = "" }: FloatingSphereProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay, type: "spring" }}
      className={`absolute ${className}`}
    >
      <motion.div
        animate={{
          y: [-10, 10, -10],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative"
        style={{ width: size, height: size }}
      >
        <div
          className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/40 via-primary/20 to-transparent blur-sm"
          style={{ width: size, height: size }}
        />
        <div
          className="absolute inset-0 rounded-full border border-primary/30"
          style={{
            width: size,
            height: size,
            background: "radial-gradient(circle at 30% 30%, hsl(300 100% 60% / 0.4), transparent 60%)",
          }}
        />
        <div
          className="absolute rounded-full bg-primary/60 blur-md"
          style={{
            width: size * 0.3,
            height: size * 0.2,
            top: "20%",
            left: "20%",
          }}
        />
      </motion.div>
    </motion.div>
  );
};
