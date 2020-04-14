import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect} from  "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import {Page} from './components/commons/page';
import {ProtectedRoute} from './components/commons/protected.route';

import {Login} from './components/backoffice/login';
import {AdminArea} from './components/backoffice/admin-area';
import {Dashboard} from './components/backoffice/dashboard';
import {ProductPage} from './components/backoffice/product-page';
import {Home} from './components/frontoffice/home';

import auth from "./classes/auth";
import user from "./classes/user";

function App() {
    //If user is saved on localstorage log him in
    let username = localStorage.getItem("user");
    if(username){
        auth.login(() => {
            //Add username to user class
            user.setUsername(username);
        });
    }

  return (
    <div className="App">
      <Router>
        <Switch>
            <Route path="/" exact component = { () => 
                  <Page>
                      <Home />
                  </Page>
                }>
            </Route>
            <ProtectedRoute path="/dashboard" component = { 
                () => 
                    <Page>
                        <AdminArea>
                            <Dashboard />
                        </AdminArea>
                    </Page>
                }>
            </ProtectedRoute>
            <ProtectedRoute path="/products" component = { 
                () => 
                    <Page>
                        <AdminArea>
                            <ProductPage />
                        </AdminArea>
                    </Page>
                }>
            </ProtectedRoute>
            <Route path="/login" component = { () =>
                <Page>
                    <Login />
                </Page>
            } ></Route>
            <Route path="*" component = { ()=> <Redirect to={
                    {
                        pathname: "/"
                    }
                } />
            }></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
