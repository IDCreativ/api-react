import React, { useState, useContext } from 'react';
import AuthAPI from '../services/authAPI';
import AuthContext from '../contexts/AuthContext';

const LoginPage = ({ history }) => {

    const { setIsAuthenticated } = useContext(AuthContext);

    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });

    const [error, setError] = useState('');

    // Gestion des champs
    const handleChange = ({ currentTarget }) => {
        const {name, value} = currentTarget;
        setCredentials({...credentials, [name]: value});
    };

    // Gestion des submit
    const handleSubmit = async event => {
        event.preventDefault();

        try {
            await AuthAPI.authenticate(credentials);
            setError('');
            setIsAuthenticated(true);
            history.replace('/customers');
        } catch (error) {
            setError(
                'Identifiants et/ou mot de passe incorrect(s).'
            );
        }
    }

    return (
        <>
            <h1>Connexion à l'application</h1>

            <div className='row'>
                <div className='col-md-4 mx-auto'>
                    <div className="card shadow-sm p-3">
                        <form onSubmit={handleSubmit}>
                            <div className='input-group mb-3'>
                                <div className='input-group-text'><i className='fal fa-at fa-fw'></i></div>
                                <input
                                    type='text'
                                    name='username'
                                    id='username'
                                    className={'form-control ' + (error && 'is-invalid')}
                                    placeholder='email@domain.com'
                                    value={credentials.username}
                                    onChange={handleChange}
                                />
                                {error && <p className='invalid-feedback'>{error}</p>}
                            </div>
                            <div className='input-group mb-3'>
                                <div className='input-group-text'><i className='fal fa-lock fa-fw'></i></div>
                                <input
                                    type='password'
                                    name='password'
                                    id='password'
                                    className='form-control'
                                    placeholder='mot de passe'
                                    value={credentials.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <button type='submit' className='btn btn-success text-light'>
                                Je me connecte
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default LoginPage;