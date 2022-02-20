import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import "./App.css";

import AddTodo from "./components/add-todo.component";
import TodoList from "./components/todo-list.component";
import Todo from "./components/todo.component";

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/todo"} className="nav-link">
                  List
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/add"} className="nav-link">
                  Add
                </Link>
              </li>
            </div>
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/todo"]} component={TodoList} />
              <Route exact path="/add" component={AddTodo} />
              <Route path="/todo/:id" component={Todo} />
            </Switch>
          </div>
        </div>
      </Router>
      
    );
  }
}

export default App;