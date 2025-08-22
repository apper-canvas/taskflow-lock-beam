import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";

const Header = ({ 
  onCreateTask, 
  onCreateProject,
  searchQuery,
  onSearchChange,
  completionPercentage = 0
}) => {
  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white border-b border-gray-200 px-6 py-4"
    >
      <div className="flex items-center justify-between">
        {/* Logo and Progress */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
              <ApperIcon name="CheckSquare" size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 font-display">
                Task<span className="gradient-text">Flow</span>
              </h1>
              <p className="text-sm text-gray-600">
                {completionPercentage}% completed today
              </p>
            </div>
          </div>
          
          {/* Progress Ring */}
          <div className="relative w-12 h-12">
            <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
              <circle
                cx="18" cy="18" r="16"
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="3"
              />
              <circle
                cx="18" cy="18" r="16"
                fill="none"
                stroke="url(#progressGradient)"
                strokeWidth="3"
                strokeDasharray={`${completionPercentage}, 100`}
                strokeLinecap="round"
                className="transition-all duration-500"
              />
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6366F1" />
                  <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
              </defs>
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-gray-700">
              {Math.round(completionPercentage)}%
            </span>
          </div>
        </div>
        
        {/* Search and Actions */}
        <div className="flex items-center gap-4">
          <div className="hidden md:block w-80">
            <SearchBar 
              value={searchQuery}
              onChange={onSearchChange}
              placeholder="Search tasks..."
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="md"
              onClick={onCreateProject}
              className="hidden sm:inline-flex"
            >
              <ApperIcon name="FolderPlus" size={16} className="mr-2" />
              Project
            </Button>
            
            <Button
              variant="accent"
              size="md"
              onClick={onCreateTask}
              className="shadow-lg"
            >
              <ApperIcon name="Plus" size={16} className="mr-2" />
              Add Task
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Search */}
      <div className="md:hidden mt-4">
        <SearchBar 
          value={searchQuery}
          onChange={onSearchChange}
          placeholder="Search tasks..."
        />
      </div>
    </motion.header>
  );
};

export default Header;