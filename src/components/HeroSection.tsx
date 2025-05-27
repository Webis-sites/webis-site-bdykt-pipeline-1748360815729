"use client";

import React, { useEffect, useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';

const HeroSection: React.FC = () => {
  const controls = useAnimation();
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => {
    // Generate random particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
    setParticles(newParticles);

    // Start pipeline animation
    controls.start({
      pathLength: 1,
      transition: {
        duration: 3,
        ease: "easeInOut",
        repeat: Infinity,
      }
    });
  }, [controls]);

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#2563eb] to-[#1e40af]">
      {/* Animated particles background */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence>
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-2 h-2 bg-white/10 rounded-full"
              initial={{ x: `${particle.x}%`, y: `${particle.y}%`, opacity: 0 }}
              animate={{
                x: [`${particle.x}%`, `${(particle.x + 20) % 100}%`],
                y: [`${particle.y}%`, `${(particle.y - 30) % 100}%`],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </AnimatePresence>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-left text-white"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            >
              Pipeline Testing
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">
                Excellence Delivered
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg sm:text-xl mb-8 text-blue-100 max-w-lg"
            >
              Ensure your CI/CD pipelines run flawlessly with our comprehensive testing platform. 
              Detect issues before they reach production and maintain continuous delivery confidence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-[#2563eb] font-semibold rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                Start Testing Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors duration-300"
              >
                View Demo
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-12 flex items-center gap-8"
            >
              <div>
                <p className="text-3xl font-bold">99.9%</p>
                <p className="text-sm text-blue-200">Uptime SLA</p>
              </div>
              <div>
                <p className="text-3xl font-bold">50ms</p>
                <p className="text-sm text-blue-200">Avg Response Time</p>
              </div>
              <div>
                <p className="text-3xl font-bold">24/7</p>
                <p className="text-sm text-blue-200">Support</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right animated pipeline */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <svg
              viewBox="0 0 400 400"
              className="w-full h-full max-w-lg mx-auto"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Pipeline structure */}
              <motion.g>
                {/* Main pipeline path */}
                <motion.path
                  d="M 50 100 L 150 100 L 150 200 L 250 200 L 250 300 L 350 300"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="20"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                
                {/* Animated flow */}
                <motion.path
                  d="M 50 100 L 150 100 L 150 200 L 250 200 L 250 300 L 350 300"
                  stroke="url(#flowGradient)"
                  strokeWidth="20"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={controls}
                />

                {/* Nodes */}
                {[
                  { cx: 50, cy: 100, label: "Source" },
                  { cx: 150, cy: 100, label: "Build" },
                  { cx: 150, cy: 200, label: "Test" },
                  { cx: 250, cy: 200, label: "Deploy" },
                  { cx: 250, cy: 300, label: "Monitor" },
                  { cx: 350, cy: 300, label: "Production" },
                ].map((node, index) => (
                  <motion.g key={index}>
                    <motion.circle
                      cx={node.cx}
                      cy={node.cy}
                      r="25"
                      fill="white"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    />
                    <motion.circle
                      cx={node.cx}
                      cy={node.cy}
                      r="20"
                      fill="#2563eb"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.1, duration: 0.3 }}
                    />
                    <motion.text
                      x={node.cx}
                      y={node.cy + 40}
                      textAnchor="middle"
                      fill="white"
                      fontSize="12"
                      fontWeight="600"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.2, duration: 0.3 }}
                    >
                      {node.label}
                    </motion.text>
                  </motion.g>
                ))}

                {/* Data flow particles */}
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.circle
                    key={`particle-${i}`}
                    r="5"
                    fill="white"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: [0, 1, 1, 0],
                      offsetDistance: ["0%", "100%"],
                    }}
                    transition={{
                      duration: 3,
                      delay: i * 0.6,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <animateMotion
                      dur="3s"
                      repeatCount="indefinite"
                      begin={`${i * 0.6}s`}
                    >
                      <mpath href="#flowPath" />
                    </animateMotion>
                  </motion.circle>
                ))}

                {/* Hidden path for particle animation */}
                <path
                  id="flowPath"
                  d="M 50 100 L 150 100 L 150 200 L 250 200 L 250 300 L 350 300"
                  fill="none"
                  stroke="none"
                />
              </motion.g>

              {/* Gradient definition */}
              <defs>
                <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="white" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#60a5fa" stopOpacity="1" />
                  <stop offset="100%" stopColor="white" stopOpacity="0.8" />
                </linearGradient>
              </defs>
            </svg>

            {/* Floating metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="absolute top-0 right-0 bg-white/10 backdrop-blur-md rounded-lg p-4 text-white"
            >
              <p className="text-sm font-semibold">Pipeline Health</p>
              <p className="text-2xl font-bold text-green-300">98.5%</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="absolute bottom-0 left-0 bg-white/10 backdrop-blur-md rounded-lg p-4 text-white"
            >
              <p className="text-sm font-semibold">Tests Passed</p>
              <p className="text-2xl font-bold text-green-300">1,247</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-white/50 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;