import { MdEdit, MdDeleteOutline } from "react-icons/md";

const TaskItem = ({ task, index, onToggle, onDelete, onEdit }) => {
  return (
    <li className="grid grid-cols-[90fr_1fr] gap-2 border rounded-sm py-4 px-3">
      <div onClick={() => onToggle(index)} className="flex items-start gap-2">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(index)}
          className="mt-1.5"
        />
        <div>
          <p
            className={`${
              task.completed ? "line-through text-gray-400" : ""
            } break-all mb-1`}
          >
            {task.title}
          </p>
          <span className="bg-green-200 px-1.5 py-0.5 rounded-md">
            {task.category}
          </span>
        </div>
      </div>

      <div className="flex items-center">
        <button onClick={() => onEdit(index)} className=" p-1">
          <MdEdit size={12} />
        </button>
        <button onClick={() => onDelete(index)} className=" p-1">
          <MdDeleteOutline />
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
