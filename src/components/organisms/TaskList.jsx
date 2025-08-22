import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import TaskCard from "@/components/organisms/TaskCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";

const TaskList = ({ 
  tasks, 
  projects,
  loading, 
  error, 
  onRetry,
  onToggleComplete, 
  onEditTask, 
  onDeleteTask,
  onDuplicateTask,
  selectedProject
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0, scale: 0.95 }
  };
  
  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={onRetry} />;
  if (tasks.length === 0) {
    const projectName = selectedProject ? selectedProject.name : "All Tasks";
    return <Empty 
      title={`No tasks in ${projectName}`}
      subtitle="Create your first task to get started with your productivity journey."
    />;
  }
  
  // Group tasks by status
  const activeTasks = tasks.filter(task => task.status === "active");
  const completedTasks = tasks.filter(task => task.status === "completed");
  
  return (
    <div className="space-y-8">
      {/* Active Tasks */}
      {activeTasks.length > 0 && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 font-display">
              Active Tasks
            </h2>
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {activeTasks.length} {activeTasks.length === 1 ? "task" : "tasks"}
            </span>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {activeTasks.map((task) => (
                <motion.div
                  key={task.Id}
                  variants={itemVariants}
                  exit="exit"
                  layout
                >
                  <TaskCard
                    task={task}
                    project={projects.find(p => p.Id === task.projectId)}
                    onToggleComplete={onToggleComplete}
                    onEdit={onEditTask}
                    onDelete={onDeleteTask}
                    onDuplicate={onDuplicateTask}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
      
      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 font-display">
              Completed Tasks
            </h2>
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {completedTasks.length} {completedTasks.length === 1 ? "task" : "tasks"}
            </span>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {completedTasks.map((task) => (
                <motion.div
                  key={task.Id}
                  variants={itemVariants}
                  exit="exit"
                  layout
                >
                  <TaskCard
                    task={task}
                    project={projects.find(p => p.Id === task.projectId)}
                    onToggleComplete={onToggleComplete}
                    onEdit={onEditTask}
                    onDelete={onDeleteTask}
                    onDuplicate={onDuplicateTask}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default TaskList;