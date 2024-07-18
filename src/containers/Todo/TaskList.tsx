import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../app/store';
import {useEffect} from 'react';
import {deleteTask, fetchTasks, updateTask} from './tasksSlice';
import Spinner from '../../components/Spinner/Spinner';

const TaskList = () => {
  const dispatch: AppDispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const isLoading  = ((state: RootState) => state.tasks.isLoading)

  useEffect(() => {
      dispatch(fetchTasks());
  }, [dispatch]);

  const onChangeStatus = (id: string, isChecked: boolean) => {
   dispatch(updateTask({
     id,
     isCompleted: isChecked
   }))
  }

  const handleDelete = (id: string) => {
    dispatch(deleteTask({id}));
  }

  return (
    <div className="list-group">
      {!isLoading ? <Spinner/> : tasks.map(task => (
        <div key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input p-2 me-3"
              defaultChecked={task.isCompleted}
              onChange={(e) => onChangeStatus(task.id, e.target.checked)}
            />
            <label className="form-check-label"><strong>{task.task}</strong></label>
          </div>
          <button className="btn btn-danger btn-sm fw-bold" onClick={() => handleDelete(task.id)}>X</button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;