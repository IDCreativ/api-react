import React, { useState } from "react";
import ReactDOM from "react-dom";
import { HashRouter, Switch, Route, withRouter } from "react-router-dom";
import AuthAPI from "./services/authAPI";
import AuthContext from "./contexts/AuthContext";

// Import des components
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";

// Import des pages
import HomePage from "./pages/Homepage";
import CustomersPage from "./pages/CustomersPage";
import CustomerPage from "./pages/CustomerPage";
import InvoicesPage from "./pages/InvoicesPage";
import InvoicePage from "./pages/InvoicePage";
import TypographyPage from "./pages/TypographyPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { ToastContainer, toast } from "react-toastify";
// import CustomersPageWithPagination from "./pages/CustomersPageWithPagination";

console.log("Lancement de react.js");

AuthAPI.setUp();

const App = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(
		AuthAPI.isAuthenticated()
	);

	const NavbarWithRouter = withRouter(Navbar);

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated: isAuthenticated,
				setIsAuthenticated: setIsAuthenticated,
			}}
		>
			<HashRouter>
				<NavbarWithRouter />

				<main className="container my-5">
					<Switch>
						<Route path="/login" component={LoginPage} />
						<Route path="/register" component={RegisterPage} />
						<PrivateRoute path="/invoices/:id" component={InvoicePage} />
						<PrivateRoute path="/invoices" component={InvoicesPage} />
						<PrivateRoute path="/customers/:id" component={CustomerPage} />
						<PrivateRoute path="/customers" component={CustomersPage} />
						<Route path="/typography" component={TypographyPage} />
						<Route path="/" component={HomePage} />
					</Switch>
				</main>
			</HashRouter>
			<ToastContainer
				position="bottom-center"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</AuthContext.Provider>
	);
};

const rootElement = document.querySelector("#app");
ReactDOM.render(<App />, rootElement);
