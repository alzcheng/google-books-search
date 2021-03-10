import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Saved from './Pages/Saved';
import Search from './Pages/Search';
import Nav from './Component/Nav/Nav';
import NoMatch from './Pages/NoMatch';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Switch>
          <Route exact path="/" component={Saved} />
          <Route exact path="/search" component={Search} />
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App;
