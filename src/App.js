import './App.css';
import 'antd/dist/antd.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from './pages/home';
import ViewProfile from './pages/viewProfile';
import EditProfile from './pages/editProfile';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/view-profile" component={ViewProfile} />
        <Route exact path="/edit-profile" component={EditProfile} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
