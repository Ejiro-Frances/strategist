import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onToggle, onDelete, onEdit }) => {
  if (!tasks.length) {
    return <p className="text-gray-500 italic text-sm">No task yet</p>;
  }

  return (
    <ul className="flex flex-col gap-3">
      {tasks.map((task, index) => (
        <TaskItem
          key={index}
          task={task}
          index={index}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
};

export default TaskList;
