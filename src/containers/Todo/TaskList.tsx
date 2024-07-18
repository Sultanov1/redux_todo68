import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../app/store';
import {useEffect} from 'react';
import {fetchTask} from './tasksSlice';

const TaskList = () => {
  const dispatch: AppDispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const isLoading = useSelector((state: RootState) => state.tasks.isLoading);

  useEffect(() => {
    if (!isLoading) {
      dispatch(fetchTask());
    }
  }, [dispatch]);

  return (
    <div className="list-group">
      {tasks.map(task => (
        <div className="list-group-item d-flex justify-content-between align-items-center">
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input p-2 me-3"
              checked={task.isCompleted}
            />
            <label className="form-check-label"><strong>{task.task}</strong></label>
          </div>
          <button className="btn btn-danger btn-sm">Delete</button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;