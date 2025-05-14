const TaskForm = ({
  task,
  category,
  onChangeTask,
  onChangeCategory,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="flex gap-3 w-full p-1">
      <input
        className="w-full border py-1 px-3 text-slate-600 rounded-md"
        type="text"
        placeholder="Enter task here"
        value={task}
        onChange={(e) => onChangeTask(e.target.value)}
      />
      <select
        className="text-[.75rem] border p-1 text-slate-600 rounded-md"
        value={category}
        onChange={(e) => onChangeCategory(e.target.value)}
      >
        <option value="work">work</option>
        <option value="personal">personal</option>
        <option value="others">others</option>
      </select>
      <button
        type="submit"
        className="min-w-[4rem] bg-slate-600 text-gray-100 p-1.5 px-2 rounded-sm"
      >
        + Add
      </button>
    </form>
  );
};

export default TaskForm;
