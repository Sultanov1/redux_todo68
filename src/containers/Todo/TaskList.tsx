const TaskList = () => {
  return (
    <div className='list-group'>
      <div className='list-group-item d-flex justify-content-between align-items-center'>
        <div className='form-check'>
          <input
            type="checkbox"
            className='form-check-input p-2 me-3'
          />
          <label className='form-check-label'><strong>Some Title</strong></label>
        </div>
        <button className='btn btn-danger btn-sm'>Delete</button>
      </div>
    </div>
  );
};

export default TaskList;