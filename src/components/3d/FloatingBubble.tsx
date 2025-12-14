import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

interface FloatingBubbleProps {
  size?: number;
  delay?: number;
  className?: string;
}

export const FloatingBubble = ({ size = 80, delay = 0, className = "" }: FloatingBubbleProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay, type: "spring" }}
      className={`absolute ${className}`}
    >
      <motion.div
        animate={{
          y: [-8, 8, -8],
          rotate: [-5, 5, -5],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative"
        style={{ width: size, height: size }}
      >
        <div
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/30 via-primary/10 to-transparent blur-md"
          style={{ width: size, height: size }}
        />
        <div
          className="absolute inset-0 rounded-2xl border border-primary/40 backdrop-blur-sm bg-primary/5 flex items-center justify-center"
          style={{ width: size, height: size }}
        >
          <MessageCircle 
            className="text-primary/70" 
            size={size * 0.5} 
            strokeWidth={1.5}
          />
        </div>
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-primary/60"
        />
      </motion.div>
    </motion.div>
  );
};
