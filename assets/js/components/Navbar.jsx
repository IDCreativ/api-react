import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthAPI from '../services/authAPI';
import AuthContext from '../contexts/AuthContext';

const Navbar = ({ history }) => {

    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

    const handleLogout = () => {
        AuthAPI.logout();
        setIsAuthenticated(false);
        history.push('/login');
    }

    return ( 
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">
                    SIM-REACT
                </NavLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/customers">Clients</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/invoices">Factures</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/typography">Typographie</NavLink>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto">
                        {(!isAuthenticated && (
                            <>
                                <li className="nav-item me-2">
                                    <NavLink to="/register" className="nav-link">Inscription</NavLink>
                                </li>
                                <li className="nav-item me-2">
                                    <NavLink to="/login" className="btn btn-success text-light">Connexion</NavLink>
                                </li>
                            </>)) || (
                            <li className="nav-item">
                                <button
                                    className="btn btn-danger text-light"
                                    onClick={handleLogout}
                                >
                                    Déconnexion
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
     );
}
 
export default Navbar;