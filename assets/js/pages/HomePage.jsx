import React from 'react'

const HomePage = (props) => {
    return ( 
        <>
            <div className="p-5 mb-4 bg-light rounded-3">
                <div className="container-fluid py-5">
                    <h1 className="display-5">Custom jumbotron</h1>
                    <p className="col-md-8 fs-4">Using a series of utilities, you can create this jumbotron, just like the one in previous versions of Bootstrap. Check out the examples below for how you can remix and restyle it to your liking.</p>
                    <a className="btn btn-primary text-light" type="button">Example button</a>
                </div>
            </div>
        </>
    );
}
 
export default HomePage;