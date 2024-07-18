import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../app/store';
import {createTask, fetchTasks} from './tasksSlice';
import ButtonSpinner from '../../components/Spinner/ButtonSpinner';

const TaskForm = () => {
  const dispatch: AppDispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.tasks.isLoading);
  const [task, setTask] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (task) {
      await dispatch(createTask({
        task,
        isCompleted: false,
      }));
      setTask('');
      dispatch(fetchTasks());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          value={task}
          placeholder="Add New task"
          onChange={(e) => setTask(e.target.value)}
        />
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isLoading}
        >
          {isLoading && <ButtonSpinner/>}
          Add Task
        </button>
      </div>
    </form>
  );
};

export default TaskForm;