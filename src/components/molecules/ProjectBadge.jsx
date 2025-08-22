import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const ProjectBadge = ({ project, showTaskCount = false, size = "md" }) => {
  const sizes = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1.5",
    lg: "text-base px-4 py-2"
  };
  
  return (
    <div className={cn(
      "inline-flex items-center gap-2 rounded-full bg-gray-100 text-gray-700 font-medium",
      sizes[size]
    )}>
      <div 
        className="w-3 h-3 rounded-full shadow-sm" 
        style={{ backgroundColor: project.color }}
      />
      <ApperIcon name={project.icon} size={14} />
      <span>{project.name}</span>
      {showTaskCount && project.taskCount > 0 && (
        <span className="bg-white text-gray-600 text-xs px-2 py-0.5 rounded-full">
          {project.taskCount}
        </span>
      )}
    </div>
  );
};

export default ProjectBadge;