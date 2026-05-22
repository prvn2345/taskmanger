export default function TaskCard({ task, onEdit, onDelete }) {
  return (
    <div className="task-card">
      <h2>{task.title}</h2>
      <p>{task.description}</p>

      <div className="task-meta">
        <p><strong>Priority:</strong> {task.priority}</p>
        <p><strong>Status:</strong> {task.status}</p>
        <p><strong>Due:</strong> {task.dueDate}</p>
      </div>

      <div className="task-actions">
        <button className="btn-edit" onClick={onEdit}>
          Edit
        </button>
        <button className="btn-delete" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}
