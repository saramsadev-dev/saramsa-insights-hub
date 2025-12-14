import { motion } from "framer-motion";

interface FloatingCubeProps {
  size?: number;
  delay?: number;
  className?: string;
}

export const FloatingCube = ({ size = 60, delay = 0, className = "" }: FloatingCubeProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay }}
      className={`absolute ${className}`}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        animate={{
          rotateX: [0, 360],
          rotateY: [0, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="relative"
        style={{
          width: size,
          height: size,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Cube faces */}
        {[
          { transform: `translateZ(${size / 2}px)`, bg: "bg-primary/20" },
          { transform: `rotateY(180deg) translateZ(${size / 2}px)`, bg: "bg-primary/15" },
          { transform: `rotateY(90deg) translateZ(${size / 2}px)`, bg: "bg-primary/25" },
          { transform: `rotateY(-90deg) translateZ(${size / 2}px)`, bg: "bg-primary/10" },
          { transform: `rotateX(90deg) translateZ(${size / 2}px)`, bg: "bg-primary/30" },
          { transform: `rotateX(-90deg) translateZ(${size / 2}px)`, bg: "bg-primary/5" },
        ].map((face, i) => (
          <div
            key={i}
            className={`absolute ${face.bg} border border-primary/40 backdrop-blur-sm`}
            style={{
              width: size,
              height: size,
              transform: face.transform,
              backfaceVisibility: "visible",
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};
