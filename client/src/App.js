// React
import React, {Fragment, useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/layout/Nav";
import Hey from './Hey';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import CreatePost from './components/postforms/CreatePost';
import PrivateRoute from './components/routing/PrivateRoute';
import About from './components/layout/About';
import PostList from './components/post/PostList';
import EditPost from './components/postforms/EditPost';
import PostItem from './components/post/PostItem';

// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

// Materialize-css
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
    M.AutoInit();
    // eslint-disable-next-line
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Nav />
          <Switch>
            <Route exact path="/" component={Hey} />
            <Route exact path="/about" component={About} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/create-post" component={CreatePost} />
            <PrivateRoute exact path="/edit-post/:id" component={EditPost} />
            <PrivateRoute exact path="/post/:id" component={PostItem} />
            <PrivateRoute exact path="/posts" component={PostList} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
