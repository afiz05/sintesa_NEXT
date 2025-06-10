"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Card, CardBody } from "@heroui/react";
import { Check, Sparkles, Star } from "lucide-react";
import { useEffect, useState } from "react";

interface LoginSuccessAnimationProps {
  isVisible: boolean;
  onComplete?: () => void;
  duration?: number;
}

export const LoginSuccessAnimation = ({
  isVisible,
  onComplete,
  duration = 3000,
}: LoginSuccessAnimationProps) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShowContent(true);
      const timer = setTimeout(() => {
        onComplete?.();
      }, duration);
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
    }
  }, [isVisible, onComplete, duration]);

  // Generate floating particles
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 0.8,
    duration: 2 + Math.random() * 2,
  }));

  return (
    <AnimatePresence>
      {showContent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          style={{ backdropFilter: "blur(8px)" }}
        >
          {/* Background particles */}
          <div className="absolute inset-0 overflow-hidden">
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute w-2 h-2 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full opacity-70"
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                }}
                initial={{ scale: 0, rotate: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  rotate: [0, 180, 360],
                  y: [-20, -60, -100],
                }}
                transition={{
                  duration: particle.duration,
                  delay: particle.delay,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>

          {/* Main success card */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: -50 }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 300,
              duration: 0.6,
            }}
            className="relative"
          >
            <Card
              className="w-80 h-80 bg-white/10 border border-white/20 backdrop-blur-xl shadow-2xl"
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
              }}
            >
              <CardBody className="flex flex-col items-center justify-center p-8 text-center">
                {/* Animated checkmark with circles */}
                <div className="relative mb-6">
                  {/* Outer expanding circle */}
                  <motion.div
                    className="absolute inset-0 w-24 h-24 bg-success/20 rounded-full"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [0, 1.2, 1], opacity: [0, 0.6, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                  />

                  {/* Middle circle */}
                  <motion.div
                    className="absolute inset-2 w-20 h-20 bg-success/30 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: 0.2,
                      type: "spring",
                      damping: 15,
                      stiffness: 200,
                    }}
                  />

                  {/* Inner circle with checkmark */}
                  <motion.div
                    className="relative w-24 h-24 bg-gradient-to-br from-success-400 to-success-600 rounded-full flex items-center justify-center shadow-lg"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      delay: 0.3,
                      type: "spring",
                      damping: 12,
                      stiffness: 150,
                    }}
                  >
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.3 }}
                    >
                      <Check
                        size={32}
                        className="text-white font-bold stroke-[3]"
                      />
                    </motion.div>
                  </motion.div>
                </div>

                {/* Success text */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="space-y-2"
                >
                  <h3 className="text-2xl font-bold text-white">
                    Login Successful!
                  </h3>
                  <p className="text-white/80 text-sm">
                    Welcome back. Redirecting you to dashboard...
                  </p>
                </motion.div>

                {/* Floating sparkles */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      style={{
                        left: `${20 + i * 15}%`,
                        top: `${20 + (i % 2) * 40}%`,
                      }}
                      initial={{ scale: 0, rotate: 0 }}
                      animate={{
                        scale: [0, 1, 0],
                        rotate: [0, 180, 360],
                        y: [0, -20, 0],
                      }}
                      transition={{
                        duration: 2,
                        delay: 1 + i * 0.1,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      {i % 2 === 0 ? (
                        <Sparkles size={16} className="text-primary-300" />
                      ) : (
                        <Star size={12} className="text-secondary-300" />
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Progress indicator */}
                <motion.div
                  className="absolute bottom-4 left-4 right-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{
                        delay: 1.3,
                        duration: (duration - 1300) / 1000,
                        ease: "easeInOut",
                      }}
                    />
                  </div>
                </motion.div>
              </CardBody>
            </Card>
          </motion.div>

          {/* Floating confetti-like elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={`confetti-${i}`}
                className={`absolute w-3 h-3 ${
                  i % 4 === 0
                    ? "bg-primary-400"
                    : i % 4 === 1
                    ? "bg-secondary-400"
                    : i % 4 === 2
                    ? "bg-success-400"
                    : "bg-warning-400"
                } opacity-80`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: "-10px",
                  borderRadius: i % 2 === 0 ? "50%" : "2px",
                }}
                initial={{ y: -10, rotate: 0, opacity: 0 }}
                animate={{
                  y: window.innerHeight + 50,
                  rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  delay: Math.random() * 2,
                  ease: "linear",
                  repeat: Infinity,
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
