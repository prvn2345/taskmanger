import React, { useEffect, useState } from "react";
import TaskCard from "./Components/TaskCard";
import TaskFormModal from "./Components/TaskFormalModal";
import FilterBar from "./Components/FilterBar";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    fetch("/tasks.json")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setFiltered(data);
      });
  }, []);

  useEffect(() => {
    let result = tasks;

    if (priorityFilter) {
      result = result.filter((t) => t.priority === priorityFilter);
    }
    if (statusFilter) {
      result = result.filter((t) => t.status === statusFilter);
    }
    if (search.trim() !== "") {
      result = result.filter((t) =>
        t.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(result);
  }, [priorityFilter, statusFilter, search, tasks]);

  const addTask = (task) => {
    const newTask = { ...task, id: Date.now() };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (updatedTask) => {
    const updatedList = tasks.map((t) =>
      t.id === updatedTask.id ? updatedTask : t
    );
    setTasks(updatedList);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className="app-container">

      
      <div className="header">
        <h1>Task Manager</h1>
        <button
          className="btn-add"
          onClick={() => {
            setEditTask(null);
            setShowModal(true);
          }}
        >
          + Add Task
        </button>
      </div>

      
      <FilterBar
        setPriorityFilter={setPriorityFilter}
        setStatusFilter={setStatusFilter}
        setSearch={setSearch}
      />

      
      <div className="task-grid">
        {filtered.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={() => {
              setEditTask(task);
              setShowModal(true);
            }}
            onDelete={deleteTask}
          />
        ))}
      </div>

    
      {showModal && (
        <TaskFormModal
          close={() => setShowModal(false)}
          onSubmit={editTask ? updateTask : addTask}
          editTask={editTask}
        />
      )}
    </div>
  );
}
