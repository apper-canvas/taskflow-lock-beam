import React from "react";
import { cn } from "@/utils/cn";

const Button = React.forwardRef(({ 
  children, 
  variant = "primary", 
  size = "md", 
  className,
  disabled,
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary to-secondary text-white shadow-md hover:shadow-lg hover:scale-[1.02] focus:ring-primary/20",
    secondary: "bg-white text-gray-700 border border-gray-300 shadow-sm hover:bg-gray-50 hover:scale-[1.02] focus:ring-primary/20",
    ghost: "text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-primary/20",
    accent: "bg-gradient-to-r from-accent to-primary text-white shadow-md hover:shadow-lg hover:scale-[1.02] focus:ring-accent/20",
    danger: "bg-error text-white shadow-md hover:bg-red-600 hover:scale-[1.02] focus:ring-error/20"
  };
  
  const sizes = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-6 text-base"
  };
  
  return (
    <button
      ref={ref}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;