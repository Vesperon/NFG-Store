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
import Test from "./Test";
import Owner from "./Owner";
import Shop from "./Shop";  
import About from "./About";
import { CartProvider } from "react-use-cart";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Cart from "./Cart";
import 'bootstrap-icons/font/bootstrap-icons.css';


function App() {
  return (
    <Router Login={Login}>
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
            <Route path="/test">
              <Test />
            </Route>
            <Route path="/owner">
              <Owner />
            </Route>  
            <Route path="/shop">
              <CartProvider>
                <Shop />
                <Cart></Cart>
              </CartProvider>
            </Route>
            <Route path ="/about">
              <About />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
   
  );
}

export default App;
