const EditModal = ({
  editTask,
  editCategory,
  onChangeTask,
  onChangeCategory,
  onCancel,
  onSubmit,
}) => {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-screen bg-black/65"></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-200 w-full max-w-[40rem] p-5 rounded-md">
        <h2 className="font-bold mb-10 text-center text-slate-800 text-2xl">
          Update Tasks
        </h2>
        <form onSubmit={onSubmit} className="flex flex-col items-center gap-3">
          <textarea
            className="w-full border p-2"
            value={editTask}
            onChange={(e) => onChangeTask(e.target.value)}
          />
          <select
            className="border p-1 text-slate-600"
            value={editCategory}
            onChange={(e) => onChangeCategory(e.target.value)}
          >
            <option value="work">work</option>
            <option value="personal">personal</option>
            <option value="others">others</option>
          </select>
          <div className="flex justify-between w-full">
            <button
              onClick={onCancel}
              type="button"
              className="bg-gray-300 p-1.5 px-2 rounded-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-slate-600 text-white p-1.5 px-2 rounded-sm"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditModal;
