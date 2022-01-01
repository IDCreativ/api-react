

import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';


import Navbar from './components/Navbar';
import HomePage from './pages/Homepage';
import CustomersPage from './pages/CustomersPage';
import InvoicesPage from './pages/InvoicesPage';
import TypographyPage from './pages/TypographyPage';
// import CustomersPageWithPagination from './pages/CustomersPageWithPagination';

// Javascript
console.log('Lancement de app.js')

const App = () => {
    return (
        <HashRouter>
            <Navbar />

            <main className="container my-5">
                <Switch>
                    <Route path="/customers" component={CustomersPage}></Route>
                    <Route path="/invoices" component={InvoicesPage}></Route>
                    <Route path="/typography" component={TypographyPage}></Route>
                    <Route path="/" component={HomePage}></Route>
                </Switch>
            </main>
            
        </HashRouter>
    );
};

const rootElement = document.querySelector('#app');
ReactDOM.render(<App />, rootElement);