import { motion } from "framer-motion";

interface GlowOrbProps {
  size?: number;
  delay?: number;
  className?: string;
}

export const GlowOrb = ({
  size = 300,
  delay = 0,
  className = "",
}: GlowOrbProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay }}
      className={`absolute pointer-events-none ${className}`}
    >
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.25, 0.45, 0.25],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="rounded-full blur-3xl"
        style={{
          width: size,
          height: size,
          background:
            "radial-gradient(circle, rgba(var(--color-primary-rgb),0.45) 0%, rgba(var(--color-secondary-rgb),0.35) 45%, transparent 70%)",
        }}
      />
    </motion.div>
  );
};
