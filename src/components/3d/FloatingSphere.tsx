import { motion } from "framer-motion";

interface FloatingSphereProps {
  size?: number;
  delay?: number;
  className?: string;
}

export const FloatingSphere = ({
  size = 100,
  delay = 0,
  className = "",
}: FloatingSphereProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay, type: "spring" }}
      className={`absolute ${className}`}
    >
      <motion.div
        animate={{
          y: [-10, 10, -10],
          rotate: [0, 4, -4, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative"
        style={{ width: size, height: size }}
      >
        {/* 🌈 Outer atmospheric glow */}
        <motion.div
          animate={{ opacity: [0.25, 0.5, 0.25] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0 rounded-full blur-2xl"
          style={{
            background:
              "radial-gradient(circle, rgba(252,152,66,0.45) 0%, rgba(254,95,117,0.3) 45%, transparent 70%)",
          }}
        />

        {/* 🟠 Sphere shell */}
        <div
          className="absolute inset-0 rounded-full backdrop-blur-sm"
          style={{
            border: "1px solid rgba(254,95,117,0.3)",
            background:
              "radial-gradient(circle at 30% 30%, rgba(252,152,66,0.4), rgba(254,95,117,0.25), transparent 60%)",
          }}
        />

        {/* ✨ Specular highlight */}
        <div
          className="absolute rounded-full blur-md"
          style={{
            width: size * 0.3,
            height: size * 0.2,
            top: "22%",
            left: "22%",
            background:
              "linear-gradient(135deg, #FC9842, #FE5F75)",
            opacity: 0.7,
          }}
        />
      </motion.div>
    </motion.div>
  );
};
