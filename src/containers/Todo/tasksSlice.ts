import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {ApiTask, ApiTasks, Task} from '../../types';
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

export const fetchTask = createAsyncThunk<Task[], void, { state: RootState }>('tasks/fetch', async () => {
  const {data: tasks} = await axiosApi.get<null | ApiTasks>('/tasks.json');
  if (tasks === null) {
    return [];
  }

  return Object.keys(tasks).map((id) => ({
    id,
    ...tasks[id]
  }));
});

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTask.pending, (state) => {
        state.isLoading = true;
      }).addCase(createTask.fulfilled, (state,) => {
      state.isLoading = false;
    }).addCase(createTask.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    }).addCase(fetchTask.pending, (state) => {
      state.isLoading = true;
    }).addCase(fetchTask.fulfilled, (state, action) => {
      state.tasks = action.payload;
      state.isLoading = false;
    }).addCase(fetchTask.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });
  }
});

export const tasksReducer = tasksSlice.reducer;