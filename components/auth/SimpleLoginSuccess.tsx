"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Card, CardBody, Spinner } from "@heroui/react";
import { Check, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

interface SimpleLoginSuccessProps {
  isVisible: boolean;
  onComplete?: () => void;
  duration?: number;
}

export const SimpleLoginSuccess = ({
  isVisible,
  onComplete,
  duration = 2000,
}: SimpleLoginSuccessProps) => {
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

  return (
    <AnimatePresence>
      {showContent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300,
            }}
          >
            <Card className="w-72 bg-zinc-100/95 dark:bg-zinc-900/95 backdrop-blur-lg shadow-xl border border-white/20">
              <CardBody className="flex flex-col items-center justify-center p-8 text-center space-y-4">
                {/* Animated checkmark */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 0.1,
                    type: "spring",
                    damping: 15,
                    stiffness: 200,
                  }}
                  className="relative"
                >
                  <motion.div
                    className="w-16 h-16 bg-success rounded-full flex items-center justify-center"
                    initial={{ rotate: -180 }}
                    animate={{ rotate: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.4, duration: 0.3 }}
                    >
                      <Check size={28} className="text-white stroke-[3]" />
                    </motion.div>
                  </motion.div>

                  {/* Pulse ring */}
                  <motion.div
                    className="absolute inset-0 w-16 h-16 border-4 border-success/30 rounded-full"
                    initial={{ scale: 1, opacity: 1 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{
                      delay: 0.5,
                      duration: 0.8,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                  />
                </motion.div>

                {/* Success text */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.3 }}
                  className="space-y-2"
                >
                  <h3 className="text-xl font-semibold text-foreground">
                    Login Successful!
                  </h3>
                  <p className="text-sm text-foreground/70">
                    Redirecting to dashboard...
                  </p>
                </motion.div>

                {/* Loading spinner */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <Spinner size="sm" color="primary" />
                </motion.div>
              </CardBody>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
