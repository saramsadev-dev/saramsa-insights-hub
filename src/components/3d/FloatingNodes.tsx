import { motion } from "framer-motion";

interface FloatingNodesProps {
  size?: number;
  delay?: number;
  className?: string;
}

export const FloatingNodes = ({ size = 100, delay = 0, className = "" }: FloatingNodesProps) => {
  const nodes = [
    { x: 50, y: 20 },
    { x: 20, y: 50 },
    { x: 80, y: 50 },
    { x: 35, y: 80 },
    { x: 65, y: 80 },
  ];

  const connections = [
    [0, 1], [0, 2], [1, 3], [2, 4], [1, 2], [3, 4],
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay, type: "spring" }}
      className={`absolute ${className}`}
    >
      <motion.div
        animate={{
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative"
        style={{ width: size, height: size }}
      >
        {/* Connection lines */}
        <svg className="absolute inset-0" style={{ width: size, height: size }}>
          {connections.map(([from, to], i) => (
            <motion.line
              key={i}
              x1={`${nodes[from].x}%`}
              y1={`${nodes[from].y}%`}
              x2={`${nodes[to].x}%`}
              y2={`${nodes[to].y}%`}
              stroke="hsl(300 100% 50% / 0.3)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: delay + i * 0.1 }}
            />
          ))}
        </svg>

        {/* Data nodes */}
        {nodes.map((node, i) => (
          <motion.div
            key={i}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
            className="absolute w-3 h-3 rounded-full bg-primary/70 border border-primary"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              transform: "translate(-50%, -50%)",
              boxShadow: "0 0 10px hsl(300 100% 50% / 0.5)",
            }}
          />
        ))}

        {/* Central glow */}
        <div
          className="absolute inset-0 rounded-full blur-xl opacity-20"
          style={{
            background: "radial-gradient(circle, hsl(300 100% 50%) 0%, transparent 70%)",
          }}
        />
      </motion.div>
    </motion.div>
  );
};
