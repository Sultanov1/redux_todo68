import TaskForm from './containers/Todo/TaskForm';
import TaskList from './containers/Todo/TaskList';
import  './App.css';

const App = () => {
    return (
        <div>
          <TaskForm/>
          <TaskList/>
        </div>
    );
};

export default App;