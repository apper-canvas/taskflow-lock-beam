import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Checkbox = React.forwardRef(({ 
  checked, 
  onChange, 
  className,
  ...props 
}, ref) => {
  const baseStyles = "h-5 w-5 rounded border-2 border-gray-300 bg-white transition-all duration-200 cursor-pointer hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";
  
  const checkedStyles = checked 
    ? "bg-gradient-to-r from-primary to-secondary border-primary text-white" 
    : "hover:bg-gray-50";
  
  return (
    <div className="relative inline-flex items-center">
      <input
        ref={ref}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only"
        {...props}
      />
      <div
        className={cn(baseStyles, checkedStyles, className)}
        onClick={() => onChange && onChange({ target: { checked: !checked } })}
      >
        {checked && (
          <ApperIcon 
            name="Check" 
            size={14}
            className="absolute inset-0 m-auto text-white animate-scale-in"
          />
        )}
      </div>
    </div>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;