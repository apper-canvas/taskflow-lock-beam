import React from "react";
import { cn } from "@/utils/cn";

const PriorityIndicator = ({ priority, size = "md", showLabel = false }) => {
  const priorities = {
    low: { color: "priority-low", label: "Low", textColor: "text-green-700" },
    medium: { color: "priority-medium", label: "Medium", textColor: "text-yellow-700" },
    high: { color: "priority-high", label: "High", textColor: "text-orange-700" },
    urgent: { color: "priority-urgent", label: "Urgent", textColor: "text-red-700" }
  };
  
  const sizes = {
    sm: "w-2 h-2",
    md: "w-3 h-3",
    lg: "w-4 h-4"
  };
  
  const config = priorities[priority] || priorities.low;
  
  if (showLabel) {
    return (
      <div className="flex items-center gap-2">
        <div className={cn("rounded-full", config.color, sizes[size])} />
        <span className={cn("text-sm font-medium", config.textColor)}>
          {config.label}
        </span>
      </div>
    );
  }
  
  return (
    <div className={cn("rounded-full", config.color, sizes[size])} />
  );
};

export default PriorityIndicator;