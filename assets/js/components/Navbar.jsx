import React from 'react';

const Navbar = (props) => {
    return ( 
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">SIM-REACT</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link" href="#/customers">Clients</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#/invoices">Factures</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#/typography">Typographie</a>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item me-2">
                            <a href="#" className="nav-link">Inscription</a>
                        </li>
                        <li className="nav-item me-2">
                            <a className="btn btn-success text-light">Connexion</a>
                        </li>
                        <li className="nav-item">
                            <a className="btn btn-danger text-light">Déconnexion</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
     );
}
 
export default Navbar;