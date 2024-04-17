import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./index.css";
import Login from "./Login";
import Signup from "./Signup";
import Inventory from "./Inventory";
import Home from "./Home";
import Order from "./Order";
import History from "./History";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";


function App() {
  return (
    <Router>
      <div className="App">
       <div className="content">
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/inventory">
              <Inventory />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/order">
              <Order />
            </Route>
            <Route path="/history">
              <History />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
   
  );
}

export default App;
