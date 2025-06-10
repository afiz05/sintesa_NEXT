"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Card, CardBody } from "@heroui/react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

interface PageTransitionSuccessProps {
  isVisible: boolean;
  onComplete?: () => void;
  duration?: number;
}

export const PageTransitionSuccess = ({
  isVisible,
  onComplete,
  duration = 2500,
}: PageTransitionSuccessProps) => {
  const [phase, setPhase] = useState<"hidden" | "showing" | "transitioning">(
    "hidden"
  );

  useEffect(() => {
    if (isVisible) {
      setPhase("showing");

      // Start transition phase
      const transitionTimer = setTimeout(() => {
        setPhase("transitioning");
      }, 1500);

      // Complete animation
      const completeTimer = setTimeout(() => {
        onComplete?.();
      }, duration);

      return () => {
        clearTimeout(transitionTimer);
        clearTimeout(completeTimer);
      };
    } else {
      setPhase("hidden");
    }
  }, [isVisible, onComplete, duration]);

  if (phase === "hidden") return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="success-overlay"
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Background with gradient animation */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary-500/20 via-secondary-500/20 to-success-500/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        />

        {/* Animated background blur */}
        <motion.div
          className="absolute inset-0 backdrop-blur-lg"
          initial={{ backdropFilter: "blur(0px)" }}
          animate={{ backdropFilter: "blur(20px)" }}
          transition={{ duration: 0.6 }}
        />

        {/* Success content */}
        <AnimatePresence mode="wait">
          {phase === "showing" && (
            <motion.div
              key="success-content"
              initial={{ scale: 0.5, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 1.1, opacity: 0, y: -20 }}
              transition={{
                type: "spring",
                damping: 20,
                stiffness: 300,
                duration: 0.6,
              }}
              className="relative z-10"
            >
              <Card className="w-96 bg-zinc-100/90 dark:bg-zinc-900/90 backdrop-blur-xl shadow-2xl border border-white/30">
                <CardBody className="flex flex-col items-center justify-center p-10 text-center">
                  {/* Large animated checkmark */}
                  <motion.div
                    className="relative mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: 0.2,
                      type: "spring",
                      damping: 12,
                      stiffness: 150,
                    }}
                  >
                    <motion.div
                      className="w-20 h-20 bg-gradient-to-br from-success-400 to-success-600 rounded-full flex items-center justify-center shadow-lg"
                      initial={{ rotate: -180 }}
                      animate={{ rotate: 0 }}
                      transition={{
                        delay: 0.3,
                        duration: 0.8,
                        ease: "easeOut",
                      }}
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.6, duration: 0.4 }}
                      >
                        <CheckCircle2
                          size={40}
                          className="text-white"
                          strokeWidth={2.5}
                        />
                      </motion.div>
                    </motion.div>

                    {/* Expanding rings */}
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute inset-0 w-20 h-20 border-2 border-success/40 rounded-full"
                        initial={{ scale: 1, opacity: 0.8 }}
                        animate={{ scale: 2 + i * 0.5, opacity: 0 }}
                        transition={{
                          delay: 0.8 + i * 0.2,
                          duration: 1.5,
                          ease: "easeOut",
                        }}
                      />
                    ))}
                  </motion.div>

                  {/* Success text */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="space-y-3 mb-6"
                  >
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                      Login Berhasil!
                    </h2>
                    <p className="text-foreground/70 text-base">
                      Sedang mengkonfigurasi sistem...
                    </p>
                  </motion.div>

                  {/* Progress bar */}
                  <motion.div
                    className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{
                        delay: 1.1,
                        duration: 1.2,
                        ease: "easeInOut",
                      }}
                    />
                  </motion.div>
                </CardBody>
              </Card>
            </motion.div>
          )}

          {phase === "transitioning" && (
            <motion.div
              key="transition-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="flex items-center space-x-3 text-white"
            >
              {/* <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <ArrowRight size={32} className="text-primary-400" />
              </motion.div> */}
              <span className="text-xl font-medium">
                Welcome to sintesaNEXT
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating particles for extra polish */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary-400/60 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                y: [0, -50, -100],
              }}
              transition={{
                duration: 3,
                delay: Math.random() * 2,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
