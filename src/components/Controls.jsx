import { MdDeleteOutline } from "react-icons/md";

const Controls = ({ onDeleteAll }) => (
  <div className="flex justify-between items-center w-full px-2">
    <button className="text-[0.8rem]">Sort by</button>
    <button onClick={onDeleteAll} className="flex items-center gap-1.5">
      <span className="text-[0.8rem] text-red-500">Delete All</span>
      <MdDeleteOutline size={14} className="fill-red-800" />
    </button>
  </div>
);

export default Controls;
