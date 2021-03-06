import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Saved from './Pages/Saved';
import Search from './Pages/Search';
import Nav from './Component/Nav/Nav';
import NoMatch from './Pages/NoMatch';
import Jumbotron from './Component/Jumbotron/Jumbotron';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Jumbotron />
        <Switch>
          <Route exact path="/saved_books" component={Saved} />
          <Route exact path="/" component={Search} />
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App;
