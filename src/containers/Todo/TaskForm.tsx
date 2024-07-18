const TaskForm = () => {
  return (
    <form className='mb-3'>
      <div className='input-group'>
        <input
          type="text"
          className='form-control'
          placeholder='Add New task'
        />
        <button type='submit' className='btn btn-primary'>Add Task</button>
      </div>
    </form>
  );
};

export default TaskForm;