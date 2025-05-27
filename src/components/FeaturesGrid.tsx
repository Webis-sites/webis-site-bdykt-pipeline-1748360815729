"use client";

import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  FiCheckCircle, 
  FiActivity, 
  FiGitBranch, 
  FiTrendingUp, 
  FiShield, 
  FiSettings 
} from 'react-icons/fi';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Metric {
  value: string;
  label: string;
  suffix?: string;
}

const FeaturesSection: React.FC = () => {
  const features: Feature[] = [
    {
      icon: <FiCheckCircle className="w-8 h-8" />,
      title: "Automated Testing",
      description: "Run comprehensive test suites automatically with every commit, ensuring code quality and reliability."
    },
    {
      icon: <FiActivity className="w-8 h-8" />,
      title: "Real-time Monitoring",
      description: "Track pipeline performance and health metrics in real-time with instant alerts and notifications."
    },
    {
      icon: <FiGitBranch className="w-8 h-8" />,
      title: "CI/CD Integration",
      description: "Seamlessly integrate with popular CI/CD tools like Jenkins, GitLab CI, and GitHub Actions."
    },
    {
      icon: <FiTrendingUp className="w-8 h-8" />,
      title: "Performance Analytics",
      description: "Gain deep insights into build times, test coverage, and deployment success rates."
    },
    {
      icon: <FiShield className="w-8 h-8" />,
      title: "Security Scanning",
      description: "Automated vulnerability scanning and compliance checks to keep your code secure."
    },
    {
      icon: <FiSettings className="w-8 h-8" />,
      title: "Custom Workflows",
      description: "Create tailored testing workflows that match your team's unique development process."
    }
  ];

  const metrics: Metric[] = [
    { value: "99.9", label: "Uptime", suffix: "%" },
    { value: "100", label: "Response", suffix: "ms" },
    { value: "24", label: "Monitoring", suffix: "/7" }
  ];

  return (
    <section id="features" className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-left">
            Why Choose Our Pipeline Testing?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-left">
            Elevate your development workflow with our comprehensive testing platform designed for modern teams
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          {metrics.map((metric, index) => (
            <MetricCard key={index} metric={metric} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureCard: React.FC<{ feature: Feature; index: number }> = ({ feature, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#2563eb] to-[#1e40af] rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
      <div className="relative bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-2xl p-8 h-full hover:border-[#2563eb]/30 transition-all duration-300">
        <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#2563eb] to-[#1e40af] rounded-xl text-white mb-6 group-hover:scale-110 transition-transform duration-300">
          {feature.icon}
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3 text-left">
          {feature.title}
        </h3>
        <p className="text-gray-600 leading-relaxed text-left">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
};

const MetricCard: React.FC<{ metric: Metric; index: number }> = ({ metric, index }) => {
  const [count, setCount] = useState(0);
  const targetValue = parseFloat(metric.value);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = targetValue / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= targetValue) {
          setCount(targetValue);
          clearInterval(timer);
        } else {
          setCount(current);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, targetValue]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#2563eb] to-[#1e40af] rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
      <div className="relative bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-2xl p-8 text-center hover:border-[#2563eb]/30 transition-all duration-300">
        <div className="text-4xl font-bold bg-gradient-to-r from-[#2563eb] to-[#1e40af] bg-clip-text text-transparent mb-2">
          {metric.value.includes('.') ? count.toFixed(1) : Math.floor(count)}{metric.suffix}
        </div>
        <div className="text-gray-600 font-medium">{metric.label}</div>
      </div>
    </motion.div>
  );
};

export default FeaturesSection;