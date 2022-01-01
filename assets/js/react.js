

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route, withRouter } from 'react-router-dom';
import AuthAPI from './services/authAPI';
import AuthContext from './contexts/AuthContext';

import Navbar from './components/Navbar';
import HomePage from './pages/Homepage';
import CustomersPage from './pages/CustomersPage';
import InvoicesPage from './pages/InvoicesPage';
import TypographyPage from './pages/TypographyPage';
import LoginPage from './pages/LoginPage';
import CustomersPageWithPagination from './pages/CustomersPageWithPagination';
import PrivateRoute from './components/PrivateRoute';

console.log('Lancement de react.js')

AuthAPI.setUp();

const App = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(
        AuthAPI.isAuthenticated()
    );

    const NavbarWithRouter = withRouter(Navbar);

    return (
        <AuthContext.Provider value={
            {
                isAuthenticated: isAuthenticated,
                setIsAuthenticated: setIsAuthenticated
            }
        }>
            <HashRouter>
                <NavbarWithRouter />

                <main className="container my-5">
                    <Switch>
                        <Route
                            path='/login'
                            component={LoginPage}
                        />
                        <PrivateRoute
                            path='/customers'
                            component={CustomersPage}
                        />
                        <PrivateRoute
                            path='/invoices'
                            component={InvoicesPage}
                        />
                        <Route path="/typography" component={TypographyPage} />
                        <Route path="/" component={HomePage} />
                    </Switch>
                </main>
                
            </HashRouter>
        </AuthContext.Provider>
    );
};

const rootElement = document.querySelector('#app');
ReactDOM.render(<App />, rootElement);