import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import { GuestRoute } from './services/GuestRoute';
import { PrivateRoute } from './services/PrivateRoute';
import Home from './pages/Home/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/log-in" component={Login} />
        <Route path="/" component={Home} />
      </Switch>
      <ToastContainer />
    </div>
  );
}

export default App;
