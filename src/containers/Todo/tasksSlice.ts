import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {ApiTask, ApiTasks, ChangeStatus, DeleteItem, Task} from '../../types';
import {RootState} from '../../app/store';

export interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  error: boolean;
}

const initialState: TaskState = {
  tasks: [],
  isLoading: false,
  error: false,
};


export const createTask = createAsyncThunk<void, ApiTask, { state: RootState }>('tasks/create', async (apiTask) => {
  const {data: tasks} = await axiosApi.post('/tasks.json', apiTask);
  return tasks;
});

export const fetchTasks = createAsyncThunk<Task[], void, { state: RootState }>('tasks/fetch', async () => {
  const {data: tasks} = await axiosApi.get<null | ApiTasks>('/tasks.json');
  if (tasks === null) {
    return [];
  }

  return Object.keys(tasks).map((id) => ({
    id,
    ...tasks[id]
  }));
});

export const updateTask = createAsyncThunk<void, ChangeStatus, { state: RootState }>('tasks/update', async ({id, isCompleted}) => {
  await axiosApi.patch(`/tasks/${id}.json`, {isCompleted});
});

export const deleteTask = createAsyncThunk<void, DeleteItem, { state: RootState }>('tasks/deleteTask', async ({id}) => {
  await axiosApi.delete(`/tasks/${id}.json`);
});

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTask.fulfilled, (state,) => {
        state.isLoading = false;
      })
      .addCase(createTask.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      })
      .addCase(fetchTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task.id !== action.meta.arg.id)
        state.isLoading = false;
      })
  }
});

export const tasksReducer = tasksSlice.reducer;
