import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Select from "@/components/atoms/Select";

const FilterBar = ({ 
  filters, 
  onFilterChange, 
  onClearFilters,
  taskCount = 0 
}) => {
  const hasActiveFilters = filters.status !== "all" || filters.priority !== "all";
  
  return (
    <motion.div 
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white border-b border-gray-200 px-6 py-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-sm font-medium text-gray-900">
            Filters:
          </div>
          
          <div className="flex items-center gap-3">
            <Select
              value={filters.status}
              onChange={(e) => onFilterChange("status", e.target.value)}
              className="w-32"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </Select>
            
            <Select
              value={filters.priority}
              onChange={(e) => onFilterChange("priority", e.target.value)}
              className="w-32"
            >
              <option value="all">All Priority</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </Select>
            
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                className="text-gray-500 hover:text-gray-700"
              >
                <ApperIcon name="X" size={14} className="mr-1" />
                Clear
              </Button>
            )}
          </div>
        </div>
        
        <div className="text-sm text-gray-600">
          {taskCount} {taskCount === 1 ? "task" : "tasks"} found
        </div>
      </div>
    </motion.div>
  );
};

export default FilterBar;