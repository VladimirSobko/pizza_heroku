import React from "react";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, BrowserRouter
} from "react-router-dom";
import Login from './components/Login/Login';
import './App.css';
import Header  from "./components/Header/Header";
import Main from "./components/Main/Main.jsx";
import { store } from './redux/store';
import Registration from './components/Registration/Registration';
import Cart from './components/Cart/Cart';
import History from './components/History/History';


function App() {
    return (
  <Provider store={store}>
          <div className="App">
           <Switch>
              <Route exact path="/">
                <Header/>
                <Main/>
              </Route>
              <Route exact path="/login">
                <Login/>
              </Route>
              <Route exact path="/registration">
                <Registration/>
              </Route>
              <Route exact path="/cart">
                <Cart/>
              </Route>
              <Route exact path="/history">
                <History/>
              </Route>
           </Switch>
          </div>
        </Provider>
  );
}

export default App;
