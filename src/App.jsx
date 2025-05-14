import React, { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import EditModal from "./components/EditModal";
import Controls from "./components/Controls";

const App = () => {
  const [task, setTask] = useState("");
  const [category, setCategory] = useState("work");
  const [taskList, setTaskList] = useState([]);
  const [editTask, setEditTask] = useState("");
  const [editCategory, setEditCategory] = useState("work");
  const [editIndex, setEditIndex] = useState(null);

  // Get tasks from local storage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks?.length) setTaskList(savedTasks);
  }, []);

  // Save tasks to local storage when taskList changes
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskList));
  }, [taskList]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() === "") {
      alert("Please enter a task");
      return;
    }
    setTaskList([...taskList, { title: task, completed: false, category }]);
    setTask("");
    setCategory("work");
  };

  // Toggle task completion
  const toggleComplete = (index) => {
    const updatedList = [...taskList];
    updatedList[index].completed = !updatedList[index].completed;
    setTaskList(updatedList);
  };

  // Delete task
  const handleDeleteTask = (index) => {
    const newTasks = taskList.filter((_, i) => i !== index);
    setTaskList(newTasks);
  };

  // Delete all tasks
  const handleDeleteAll = () => {
    setTaskList([]);
  };

  // Update task
  const handleEditUpdate = (e) => {
    e.preventDefault();
    if (editTask.trim() === 0) return;

    const updatedTask = {
      ...taskList[editIndex],
      title: editTask,
      category: editCategory,
    };

    const updatedList = [...taskList];
    updatedList[editIndex] = updatedTask;
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

        {/* Task Form */}
        <TaskForm
          task={task}
          category={category}
          onChangeTask={setTask}
          onChangeCategory={setCategory}
          onSubmit={handleSubmit}
        />

        {/* Task Controls (Sort/Delete All) */}
        {taskList.length > 0 && <Controls onDeleteAll={handleDeleteAll} />}

        {/* Task List */}
        <section className="mt-5 max-w-[40rem] px-4">
          <TaskList
            tasks={taskList}
            onToggle={toggleComplete}
            onDelete={handleDeleteTask}
            onEdit={(index) => {
              setEditTask(taskList[index].title);
              setEditCategory(taskList[index].category);
              setEditIndex(index);
            }}
          />
        </section>

        {/* Edit Modal */}
        {editIndex !== null && (
          <EditModal
            editTask={editTask}
            editCategory={editCategory}
            onChangeTask={setEditTask}
            onChangeCategory={setEditCategory}
            onCancel={() => {
              setEditIndex(null);
              setEditTask("");
            }}
            onSubmit={handleEditUpdate}
          />
        )}
      </section>
    </main>
  );
};

export default App;
