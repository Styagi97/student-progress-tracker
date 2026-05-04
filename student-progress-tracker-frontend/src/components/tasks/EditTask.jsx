import { useState, useEffect } from "react";
import { useTasks } from "../../context/TaskContext";

const EditTaskModal = ({ open, setOpen, task }) => {
  const { updateTask } = useTasks();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    }
  }, [task]);

  if (!open) return null;

  const handleUpdate = async () => {
    await updateTask({
      ...task,
      title,
      description,
    });

    setOpen(false);
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex justify-center items-center"
      onClick={() => setOpen(false)}
    >
      <div
        className="bg-white p-6 rounded-lg w-80"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-bold mb-3">Edit Task</h2>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border w-full mb-2 p-2"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border w-full mb-2 p-2"
        />
        <div className="flex justify-between">
          <button onClick={() => setOpen(false)}>Cancel</button>

          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;
