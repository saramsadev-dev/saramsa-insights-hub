import { motion } from "framer-motion";
import { Brain } from "lucide-react";

interface FloatingBrainProps {
  size?: number;
  delay?: number;
  className?: string;
}

export const FloatingBrain = ({ size = 100, delay = 0, className = "" }: FloatingBrainProps) => {
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
          rotateY: [0, 10, 0, -10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative"
        style={{ width: size, height: size }}
      >
        {/* Neural glow effect */}
        <motion.div
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute inset-0 rounded-full blur-xl"
          style={{
            background: "radial-gradient(circle, hsl(300 100% 50% / 0.4) 0%, transparent 70%)",
          }}
        />
        
        {/* Brain container */}
        <div
          className="absolute inset-0 rounded-full border border-primary/30 backdrop-blur-sm flex items-center justify-center"
          style={{
            background: "radial-gradient(circle at 30% 30%, hsl(300 100% 60% / 0.2), transparent 60%)",
          }}
        >
          <Brain 
            className="text-primary/80" 
            size={size * 0.55} 
            strokeWidth={1.5}
          />
        </div>

        {/* Synapse pulses */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{
              scale: [0, 1.5, 0],
              opacity: [0.8, 0, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.6,
            }}
            className="absolute rounded-full bg-primary/50"
            style={{
              width: 8,
              height: 8,
              top: `${20 + i * 25}%`,
              left: `${70 + (i % 2) * 15}%`,
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};
