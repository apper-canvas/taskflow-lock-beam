import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const ProjectSidebar = ({ 
  projects, 
  selectedProject, 
  onSelectProject, 
  onCreateProject,
  allTasksCount = 0
}) => {
  const sidebarVariants = {
    hidden: { x: -300, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  };
  
  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  };
  
  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside 
        initial="hidden"
        animate="visible"
        variants={sidebarVariants}
        className="hidden lg:flex w-72 bg-white border-r border-gray-200 flex-col h-screen sticky top-0"
      >
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 font-display">
            Projects
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Organize your tasks
          </p>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          <div className="px-4 space-y-2">
            {/* All Tasks */}
            <motion.button
              variants={itemVariants}
              onClick={() => onSelectProject(null)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-all duration-200 group ${
                !selectedProject 
                  ? "bg-gradient-to-r from-primary/10 to-accent/10 text-primary border-l-4 border-primary" 
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <ApperIcon 
                  name="Inbox" 
                  size={18} 
                  className={!selectedProject ? "text-primary" : "text-gray-500 group-hover:text-gray-700"}
                />
                <span className="font-medium">All Tasks</span>
              </div>
              {allTasksCount > 0 && (
                <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                  {allTasksCount}
                </span>
              )}
            </motion.button>
            
            {/* Project List */}
            {projects.map((project, index) => (
              <motion.button
                key={project.Id}
                variants={itemVariants}
                transition={{ delay: index * 0.05 }}
                onClick={() => onSelectProject(project)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-all duration-200 group ${
                  selectedProject?.Id === project.Id 
                    ? "bg-gradient-to-r from-primary/10 to-accent/10 text-primary border-l-4 border-primary" 
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full shadow-sm" 
                    style={{ backgroundColor: project.color }}
                  />
                  <ApperIcon 
                    name={project.icon} 
                    size={16} 
                    className={selectedProject?.Id === project.Id ? "text-primary" : "text-gray-500 group-hover:text-gray-700"}
                  />
                  <span className="font-medium truncate">{project.name}</span>
                </div>
                {project.taskCount > 0 && (
                  <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                    {project.taskCount}
                  </span>
                )}
              </motion.button>
            ))}
          </div>
        </div>
        
        {/* Add Project Button */}
        <div className="p-4 border-t border-gray-200">
          <Button
            variant="ghost"
            size="md"
            onClick={onCreateProject}
            className="w-full justify-start text-gray-600 hover:text-gray-900"
          >
            <ApperIcon name="Plus" size={16} className="mr-2" />
            New Project
          </Button>
        </div>
      </motion.aside>
      
      {/* Mobile Project Bar */}
      <div className="lg:hidden bg-white border-b border-gray-200 p-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => onSelectProject(null)}
            className={`flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              !selectedProject 
                ? "bg-gradient-to-r from-primary to-accent text-white shadow-md" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <ApperIcon name="Inbox" size={16} />
            All Tasks
            {allTasksCount > 0 && (
              <span className="bg-white/20 text-xs px-1.5 py-0.5 rounded-full">
                {allTasksCount}
              </span>
            )}
          </button>
          
          {projects.map((project) => (
            <button
              key={project.Id}
              onClick={() => onSelectProject(project)}
              className={`flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedProject?.Id === project.Id 
                  ? "bg-gradient-to-r from-primary to-accent text-white shadow-md" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: project.color }}
              />
              <ApperIcon name={project.icon} size={14} />
              {project.name}
              {project.taskCount > 0 && (
                <span className="bg-white/20 text-xs px-1.5 py-0.5 rounded-full">
                  {project.taskCount}
                </span>
              )}
            </button>
          ))}
          
          <button
            onClick={onCreateProject}
            className="flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-200"
          >
            <ApperIcon name="Plus" size={14} />
            Project
          </button>
        </div>
      </div>
    </>
  );
};

export default ProjectSidebar;