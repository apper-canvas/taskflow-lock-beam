import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No tasks yet", 
  subtitle = "Create your first task to get started with your productivity journey." 
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center"
    >
      <div className="w-24 h-24 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full flex items-center justify-center mb-6">
        <ApperIcon name="CheckSquare" size={48} className="text-primary/60" />
      </div>
      
      <h3 className="text-2xl font-semibold text-gray-900 mb-2 font-display">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-md leading-relaxed">
        {subtitle}
      </p>
      
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <ApperIcon name="Zap" size={16} className="text-accent" />
        <span>Click the "Add Task" button to begin your journey</span>
      </div>
    </motion.div>
  );
};

export default Empty;