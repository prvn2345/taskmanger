import React, { useState, useEffect } from "react";

export default function TaskFormModal({ close, onSubmit, editTask }) {
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "",
    status: "",
    dueDate: "",
  });

  useEffect(() => {
    if (editTask) setTask(editTask);
  }, [editTask]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const submit = () => {
    onSubmit(task);
    close();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>{editTask ? "Edit Task" : "Add Task"}</h2>

        <div className="modal-form">
          <input
            type="text"
            name="title"
            placeholder="Task Title"
            value={task.title}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Description"
            value={task.description}
            onChange={handleChange}
          />

          <select name="priority" value={task.priority} onChange={handleChange}>
            <option value="">Select Priority</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <select name="status" value={task.status} onChange={handleChange}>
            <option value="">Select Status</option>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>

          <input
            type="date"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
          />

          <div className="modal-buttons">
            <button className="btn-cancel" onClick={close}>
              Cancel
            </button>
            <button className="btn-submit" onClick={submit}>
              {editTask ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
