import { motion } from "framer-motion";

interface GlowOrbProps {
  size?: number;
  delay?: number;
  className?: string;
}

export const GlowOrb = ({ size = 300, delay = 0, className = "" }: GlowOrbProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay }}
      className={`absolute pointer-events-none ${className}`}
    >
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="rounded-full blur-3xl"
        style={{
          width: size,
          height: size,
          background: "radial-gradient(circle, hsl(300 100% 50% / 0.4) 0%, transparent 70%)",
        }}
      />
    </motion.div>
  );
};
