import React, { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";

const App = () => {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [editTask, setEditTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  // get tasks from local storage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));

    if (savedTasks && savedTasks.length > 0) {
      setTaskList(savedTasks);
    }
  }, []);

  // save tasks to local storage when ever taskList changes
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskList));
  }, [taskList]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // if task is empty return an error message
    if (task.trim() === "") {
      alert("Please enter a task");
      return;
    }

    setTaskList([...taskList, task]);

    // set back to default
    setTask("");
  };

  // Delete task
  const handleDeleteTask = (index) => {
    const newTasks = taskList.filter((_, i) => i !== index);

    setTaskList(newTasks);
  };

  // Delete All
  const handleDeleteAll = () => {
    setTaskList([]);
  };

  // update edit
  const handleEditUpdate = (e) => {
    e.preventDefault();
    if (editTask.trim() === 0) return;

    const updatedList = [...taskList];
    updatedList[editIndex] = editTask;

    setTaskList(updatedList);
    setEditTask("");
    setEditIndex(null);
  };

  return (
    <main className="bg-slate-600 w-full h-screen p-3">
      <section className="flex flex-col justify-center items-center max-w-[40rem] w-full mx-auto bg-white/90 shadow-md rounded-md p-4">
        <h1 className="text-3xl font-extrabold text-slate-950 py-5">
          My Todos
        </h1>
        {/* display input field */}
        <form onSubmit={handleSubmit} className="flex gap-3 w-full p-1">
          <input
            className="w-full border border-gray-200 py-1 px-3 text-slate-600 rounded-md outline-1 outline-slate-500"
            type="text"
            placeholder="Enter task here"
            value={task}
            onChange={(e) => {
              setTask(e.target.value);
            }}
          />
          <button
            type="submit"
            className="min-w-[4rem] sm:min-w-[7rem] bg-slate-600 hover:bg-slate-600 text-gray-100 p-1.5 px-2 rounded-sm"
          >
            + Add
          </button>
        </form>

        {/* delete all and sort */}
        {taskList.length > 0 && (
          <div className=" max-w-[40rem] w-full flex justify-between items-center flex-wrap px-2">
            <button className="text-[0.8rem]">Sort by</button>
            <button
              onClick={handleDeleteAll}
              className="flex items-center gap-1.5 rounded p-0.5"
            >
              <span className="text-[0.8rem] text-red-500">Delete All</span>
              <MdDeleteOutline size={14} className="fill-red-800" />
            </button>
          </div>
        )}

        {/* Display Tasks here */}
        <section className="mt-5 max-w-[40rem] px-4">
          {taskList.length === 0 ? (
            <p className="text-gray-500 italic text-sm">No task yet</p>
          ) : (
            //  map through the task list
            <ul className="flex flex-col gap-3">
              {taskList.map((taskItem, index) => (
                <li
                  key={index}
                  className=" grid grid-cols-[90fr_1fr] gap-2 shadow-md border border-gray-400 rounded-sm py-4 px-3"
                >
                  <span className="break-all"> {taskItem}</span>

                  <div className="flex items-center">
                    <button
                      className="border border-gray-200 p-1"
                      onClick={() => {
                        setEditTask(taskItem);
                        setEditIndex(index);
                      }}
                    >
                      <MdEdit size={12} />
                    </button>
                    <button
                      onClick={() => handleDeleteTask(index)}
                      className="border border-gray-200 p-1"
                    >
                      <MdDeleteOutline />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Edit Task */}
        {editIndex !== null && (
          <section className="">
            {/* overlay */}
            <div className="fixed top-0 left-0 right-0 h-screen bg-black/65"></div>
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-200 max-w-[40rem] w-full p-5 border border-slate-300 rounded-md">
              <h2 className="font-bold mb-3 text-center text-slate-800 text-2xl">
                Update Tasks
              </h2>

              <form
                onSubmit={handleEditUpdate}
                className="flex flex-col justify-center items-center gap-3"
              >
                <textarea
                  type="text"
                  className="max-w-[30rem] w-full h-full border border-slate-300 outline outline-slate-600 rounded-sm p-2"
                  value={editTask}
                  onChange={(e) => setEditTask(e.target.value)}
                ></textarea>

                {/* buttons */}
                <div className="flex justify-between max-w-[30rem] w-full">
                  <button
                    onClick={() => {
                      setEditIndex(null);
                      setEditTask("");
                    }}
                    type="button"
                    className="bg-gray-300 min-w-[4rem] sm:min-w-[7rem] p-1.5 px-2 rounded-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="min-w-[4rem] sm:min-w-[7rem] bg-slate-600 hover:bg-slate-600 text-gray-100 p-1.5 px-2 rounded-sm"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </section>
        )}
      </section>
    </main>
  );
};

export default App;
