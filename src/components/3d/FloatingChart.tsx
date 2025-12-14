import { motion } from "framer-motion";

interface FloatingChartProps {
  size?: number;
  delay?: number;
  className?: string;
}

export const FloatingChart = ({ size = 80, delay = 0, className = "" }: FloatingChartProps) => {
  const bars = [
    { height: 0.4, delay: 0 },
    { height: 0.7, delay: 0.1 },
    { height: 0.5, delay: 0.2 },
    { height: 0.9, delay: 0.3 },
    { height: 0.6, delay: 0.4 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay }}
      className={`absolute ${className}`}
    >
      <motion.div
        animate={{
          y: [-5, 5, -5],
          rotate: [-3, 3, -3],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative rounded-xl border border-primary/30 backdrop-blur-sm bg-primary/5 p-3"
        style={{ width: size, height: size }}
      >
        {/* Chart bars */}
        <div className="flex items-end justify-between h-full gap-1">
          {bars.map((bar, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${bar.height * 100}%` }}
              transition={{
                duration: 1,
                delay: delay + bar.delay,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 2,
              }}
              className="flex-1 rounded-t bg-gradient-to-t from-primary/60 to-primary/30"
            />
          ))}
        </div>

        {/* Trend line */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5, delay: delay + 0.5 }}
          className="absolute bottom-6 left-3 right-3 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"
        />
      </motion.div>
    </motion.div>
  );
};
