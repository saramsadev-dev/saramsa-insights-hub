import { motion } from "framer-motion";

interface FloatingChartProps {
  size?: number;
  delay?: number;
  className?: string;
}

export const FloatingChart = ({
  size = 80,
  delay = 0,
  className = "",
}: FloatingChartProps) => {
  const bars = [
    { height: 0.4, delay: 0 },
    { height: 0.7, delay: 0.1 },
    { height: 0.5, delay: 0.2 },
    { height: 0.9, delay: 0.3 },
    { height: 0.6, delay: 0.4 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay, type: "spring" }}
      className={`absolute ${className}`}
    >
      <motion.div
        animate={{
          y: [-5, 5, -5],
          rotate: [-3, 3, -3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative rounded-xl backdrop-blur-md p-3"
        style={{
          width: size,
          height: size,
          border: "1px solid rgba(var(--color-secondary-rgb),0.35)",
          background:
            "linear-gradient(135deg, rgba(var(--color-primary-rgb),0.12), rgba(var(--color-secondary-rgb),0.08))",
        }}
      >
        {/* 📊 Chart bars */}
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
              className="flex-1 rounded-t"
              style={{
                background:
                  "linear-gradient(to top, var(--color-primary-hex), var(--color-secondary-hex))",
                boxShadow: "0 0 8px rgba(var(--color-secondary-rgb),0.4)",
              }}
            />
          ))}
        </div>

        {/* 📈 Trend line */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.6, delay: delay + 0.5 }}
          className="absolute bottom-6 left-3 right-3 h-0.5"
          style={{
            background:
              "linear-gradient(to right, transparent, var(--color-primary-hex), var(--color-secondary-hex), transparent)",
            opacity: 0.7,
          }}
        />

        {/* 🌫️ Ambient chart glow */}
        <motion.div
          animate={{ opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 4.5, repeat: Infinity }}
          className="absolute inset-0 rounded-xl blur-xl pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(var(--color-primary-rgb),0.35) 0%, rgba(var(--color-secondary-rgb),0.25) 45%, transparent 70%)",
          }}
        />
      </motion.div>
    </motion.div>
  );
};