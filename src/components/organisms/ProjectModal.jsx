import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import FormField from "@/components/molecules/FormField";

const ProjectModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  project = null 
}) => {
  const [formData, setFormData] = useState({
    name: "",
    color: "#6366F1",
    icon: "Folder"
  });
  
  const [errors, setErrors] = useState({});
  
  const colorOptions = [
    "#6366F1", // Primary
    "#8B5CF6", // Secondary
    "#EC4899", // Accent
    "#10B981", // Success
    "#F59E0B", // Warning
    "#EF4444", // Error
    "#3B82F6", // Info
    "#8B8B8B", // Gray
  ];
  
  const iconOptions = [
    "Folder", "FolderOpen", "Briefcase", "Target", "Star",
    "Heart", "Zap", "Rocket", "Trophy", "Coffee",
    "Home", "Car", "Plane", "Camera", "Music"
  ];
  
  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name || "",
        color: project.color || "#6366F1",
        icon: project.icon || "Folder"
      });
    } else {
      setFormData({
        name: "",
        color: "#6366F1",
        icon: "Folder"
      });
    }
    setErrors({});
  }, [project, isOpen]);
  
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Project name is required";
    }
    
    return newErrors;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    onSubmit(formData);
    onClose();
  };
  
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 }
  };
  
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };
  
  if (!isOpen) return null;
  
  return (
    <AnimatePresence>
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={backdropVariants}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          variants={modalVariants}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="w-full max-w-md bg-white rounded-2xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 font-display">
              {project ? "Edit Project" : "Create New Project"}
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600"
            >
              <ApperIcon name="X" size={16} />
            </Button>
          </div>
          
          {/* Preview */}
          <div className="p-6 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
              <div 
                className="w-4 h-4 rounded-full shadow-sm" 
                style={{ backgroundColor: formData.color }}
              />
              <ApperIcon name={formData.icon} size={18} className="text-gray-600" />
              <span className="font-medium text-gray-900">
                {formData.name || "Project Name"}
              </span>
            </div>
          </div>
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <FormField 
              label="Project Name" 
              error={errors.name}
              required
            >
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter project name..."
                error={errors.name}
                className="text-base"
              />
            </FormField>
            
            <FormField label="Color">
              <div className="grid grid-cols-8 gap-2">
                {colorOptions.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => handleInputChange("color", color)}
                    className={`w-8 h-8 rounded-lg shadow-sm transition-all duration-200 hover:scale-110 ${
                      formData.color === color 
                        ? "ring-2 ring-offset-2 ring-gray-400 scale-110" 
                        : ""
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </FormField>
            
            <FormField label="Icon">
              <div className="grid grid-cols-5 gap-2 max-h-32 overflow-y-auto">
                {iconOptions.map((iconName) => (
                  <button
                    key={iconName}
                    type="button"
                    onClick={() => handleInputChange("icon", iconName)}
                    className={`p-3 rounded-lg border border-gray-200 hover:border-primary/30 hover:bg-gray-50 transition-all duration-200 ${
                      formData.icon === iconName 
                        ? "bg-primary/10 border-primary text-primary" 
                        : "text-gray-600"
                    }`}
                  >
                    <ApperIcon name={iconName} size={20} />
                  </button>
                ))}
              </div>
            </FormField>
            
            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="secondary"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="accent"
                className="shadow-lg"
              >
                <ApperIcon name={project ? "Save" : "Plus"} size={16} className="mr-2" />
                {project ? "Update Project" : "Create Project"}
              </Button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectModal;