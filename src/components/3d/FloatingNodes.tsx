import { motion } from "framer-motion";

interface FloatingNodesProps {
  size?: number;
  delay?: number;
  className?: string;
}

export const FloatingNodes = ({
  size = 100,
  delay = 0,
  className = "",
}: FloatingNodesProps) => {
  const nodes = [
    { x: 50, y: 20 },
    { x: 20, y: 50 },
    { x: 80, y: 50 },
    { x: 35, y: 80 },
    { x: 65, y: 80 },
  ];

  const connections = [
    [0, 1],
    [0, 2],
    [1, 3],
    [2, 4],
    [1, 2],
    [3, 4],
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay, type: "spring" }}
      className={`absolute ${className}`}
    >
      <motion.div
        animate={{ rotate: [0, 4, -4, 0] }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative"
        style={{ width: size, height: size }}
      >
        {/* 🔗 Connection lines */}
        <svg className="absolute inset-0" width={size} height={size}>
          <defs>
            <linearGradient
              id="node-line-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#FC9842" />
              <stop offset="100%" stopColor="#FE5F75" />
            </linearGradient>
          </defs>

          {connections.map(([from, to], i) => (
            <motion.line
              key={i}
              x1={`${nodes[from].x}%`}
              y1={`${nodes[from].y}%`}
              x2={`${nodes[to].x}%`}
              y2={`${nodes[to].y}%`}
              stroke="url(#node-line-gradient)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{ duration: 1, delay: delay + i * 0.1 }}
            />
          ))}
        </svg>

        {/* 🔵 Data nodes */}
        {nodes.map((node, i) => (
          <motion.div
            key={i}
            animate={{
              scale: [1, 1.35, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              delay: i * 0.35,
            }}
            className="absolute rounded-full"
            style={{
              width: 10,
              height: 10,
              left: `${node.x}%`,
              top: `${node.y}%`,
              transform: "translate(-50%, -50%)",
              background:
                "linear-gradient(135deg, #FC9842, #FE5F75)",
              boxShadow:
                "0 0 12px rgba(252,152,66,0.6), 0 0 20px rgba(254,95,117,0.4)",
            }}
          />
        ))}

        {/* 🌫️ Central glow */}
        <motion.div
          animate={{ opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0 rounded-full blur-2xl"
          style={{
            background:
              "radial-gradient(circle, rgba(252,152,66,0.4) 0%, rgba(254,95,117,0.25) 45%, transparent 70%)",
          }}
        />
      </motion.div>
    </motion.div>
  );
};