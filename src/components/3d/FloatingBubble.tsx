import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

interface FloatingBubbleProps {
  size?: number;
  delay?: number;
  className?: string;
}

export const FloatingBubble = ({
  size = 80,
  delay = 0,
  className = "",
}: FloatingBubbleProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay, type: "spring" }}
      className={`absolute ${className}`}
    >
      <motion.div
        animate={{
          y: [-8, 8, -8],
          rotate: [-4, 4, -4],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative"
        style={{ width: size, height: size }}
      >
        {/* 🌫️ Soft ambient glow */}
        <motion.div
          animate={{ opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 3.5, repeat: Infinity }}
          className="absolute inset-0 rounded-2xl blur-lg"
          style={{
            background:
              "radial-gradient(circle, rgba(252,152,66,0.35) 0%, rgba(254,95,117,0.25) 45%, transparent 70%)",
          }}
        />

        {/* 💬 Bubble container */}
        <div
          className="absolute inset-0 rounded-2xl backdrop-blur-md flex items-center justify-center transition-all duration-300"
          style={{
            border: "1px solid rgba(254,95,117,0.35)",
            background:
              "linear-gradient(135deg, rgba(252,152,66,0.15), rgba(254,95,117,0.1))",
          }}
        >
          {/* Gradient icon */}
          <MessageCircle
            size={size * 0.5}
            strokeWidth={1.5}
            style={{
              stroke: "url(#bubble-gradient)",
              filter: "drop-shadow(0 0 6px rgba(254,95,117,0.4))",
            }}
          />
        </div>

        {/* SVG gradient for icon */}
        <svg width="0" height="0">
          <defs>
            <linearGradient
              id="bubble-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#FC9842" />
              <stop offset="100%" stopColor="#FE5F75" />
            </linearGradient>
          </defs>
        </svg>

        {/* ✨ Notification pulse */}
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 2.2, repeat: Infinity }}
          className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
          style={{
            background:
              "linear-gradient(135deg, #FC9842, #FE5F75)",
            boxShadow: "0 0 8px rgba(254,95,117,0.6)",
          }}
        />
      </motion.div>
    </motion.div>
  );
};