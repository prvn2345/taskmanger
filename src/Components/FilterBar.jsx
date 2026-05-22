export default function FilterBar({ setPriorityFilter, setStatusFilter, setSearch }) {
  return (
    <div className="filter-bar">

      <input
        type="text"
        placeholder="Search by title..."
        onChange={(e) => setSearch(e.target.value)}
      />

      <select onChange={(e) => setPriorityFilter(e.target.value)}>
        <option value="">All Priorities</option>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <select onChange={(e) => setStatusFilter(e.target.value)}>
        <option value="">All Status</option>
        <option>Pending</option>
        <option>In Progress</option>
        <option>Completed</option>
      </select>

    </div>
  );
}
