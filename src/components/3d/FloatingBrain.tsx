import { motion } from "framer-motion";
import { Brain } from "lucide-react";

interface FloatingBrainProps {
  size?: number;
  delay?: number;
  className?: string;
}

export const FloatingBrain = ({
  size = 100,
  delay = 0,
  className = "",
}: FloatingBrainProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay, type: "spring" }}
      whileHover={{ scale: 1.05 }}
      className={`absolute group ${className}`}
    >
      <motion.div
        animate={{
          y: [-10, 10, -10],
          rotateY: [0, 12, 0, -12, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative"
        style={{ width: size, height: size }}
      >
        {/* Neural Glow */}
        <motion.div
          animate={{
            opacity: [0.3, 0.65, 0.3],
            rotate: [0, 360],
          }}
          transition={{
            opacity: { duration: 3.5, repeat: Infinity },
            rotate: { duration: 18, repeat: Infinity, ease: "linear" },
          }}
          className="absolute inset-0 rounded-full blur-2xl"
          style={{
            background:
              "conic-gradient(from 0deg, var(--color-primary-hex), var(--color-secondary-hex), var(--color-primary-hex))",
          }}
        />

        {/* Brain Container */}
        <div
          className="absolute inset-0 rounded-full backdrop-blur-md flex items-center justify-center transition-all duration-300
                     border border-white/10
                     group-hover:border-white/25"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(var(--color-primary-rgb),0.35), rgba(var(--color-secondary-rgb),0.2), transparent 65%)",
          }}
        >
          {/* Gradient Brain Icon */}
          <Brain
            size={size * 0.55}
            strokeWidth={1.4}
            style={{
              stroke: "url(#brain-gradient)",
              filter: "drop-shadow(0 0 12px rgba(var(--color-secondary-rgb),0.45))",
            }}
          />
        </div>

        {/* SVG Gradient Definition */}
        <svg width="0" height="0">
          <defs>
            <linearGradient
              id="brain-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="var(--color-primary-hex)" />
              <stop offset="100%" stopColor="var(--color-secondary-hex)" />
            </linearGradient>
          </defs>
        </svg>

        {/* ⚡ Synapse Pulses */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{
              scale: [0, 1.6, 0],
              opacity: [0.9, 0, 0.9],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              delay: i * 0.7,
            }}
            className="absolute rounded-full"
            style={{
              width: 8,
              height: 8,
              top: `${22 + i * 24}%`,
              left: `${68 + (i % 2) * 18}%`,
              background:
                "linear-gradient(135deg, var(--color-primary-hex), var(--color-secondary-hex))",
              boxShadow: "0 0 12px rgba(var(--color-secondary-rgb),0.6)",
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};
