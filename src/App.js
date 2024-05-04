import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login/Login';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
