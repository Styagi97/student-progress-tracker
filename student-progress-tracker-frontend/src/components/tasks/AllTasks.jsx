import React, { useEffect, useState } from "react";
 import TaskCard from "./TaskCard";
import { useTasks } from "../../context/TaskContext";
import EditTaskModal from "./EditTask";


const AllTasks = () => {
  const { tasks, loading } = useTasks();
 
  const [editOpen, setEditOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

 const handleEdit = (task) => {
    setSelectedTask(task);
    setEditOpen(true);
  };

  //Loading
  if (loading) {
  return (
    <div className="p-6">
      <p className="text-gray-500">Loading tasks...</p>
    </div>
  );
}

  return (
   
    <div className="p-6">

       {/* Heading */}
             <h2 className="text-xl font-bold mb-4">
              All Tasks 📋
              </h2>

              {/* No Tasks */}
      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks found 😶</p>
      ) : (
         /* Task List */
        <div className="space-y-3">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}     
              onEdit={handleEdit}
        
          />
          ))}
          {/* Edit Modal */}
           <EditTaskModal
        open={editOpen}
        setOpen={setEditOpen}
        task={selectedTask}
       />
        
        </div>
      )}
    </div>
  );
};

export default AllTasks;
