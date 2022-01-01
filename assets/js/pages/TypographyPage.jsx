import React from "react";

const TypographyPage = (props) => {
	return (
		<>
			<div className="row">
				<div className="col-12">
					<h1>H1 - Lorem ipsum sin amet</h1>
					<h2>H2 - Lorem ipsum sin amet</h2>
					<h3>H3 - Lorem ipsum sin amet</h3>
					<h4>H4 - Lorem ipsum sin amet</h4>
					<h5>H5 - Lorem ipsum sin amet</h5>
					<h6>H6 - Lorem ipsum sin amet</h6>
				</div>
			</div>
			<hr className="my-5" />
			<div className="row">
				<h2>Lorem ipsum dolor sit amet consectetur</h2>
				<div className="col-md-6">
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Et error
						impedit ducimus reiciendis? Commodi recusandae voluptatum magni
						omnis saepe eaque corporis nesciunt ab iste facere. Hic quia ea
						explicabo numquam.
					</p>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Et error
						impedit ducimus reiciendis? Commodi recusandae voluptatum magni
						omnis saepe eaque corporis nesciunt ab iste facere. Hic quia ea
						explicabo numquam.
					</p>
				</div>
				<div className="col-md-6">
					<img
						className="img-fluid rounded shadow-perso"
						src="https://picsum.photos/960/540?random=1"
						alt=""
					/>
				</div>
			</div>
			<hr className="my-5" />
			<div className="row">
				<h2>Lorem ipsum dolor sit amet consectetur</h2>
				<div className="col-md-6">
					<img
						className="img-fluid rounded shadow-perso"
						src="https://picsum.photos/960/540?random=2"
						alt=""
					/>
				</div>
				<div className="col-md-6">
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Et error
						impedit ducimus reiciendis? Commodi recusandae voluptatum magni
						omnis saepe eaque corporis nesciunt ab iste facere. Hic quia ea
						explicabo numquam.
					</p>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Et error
						impedit ducimus reiciendis? Commodi recusandae voluptatum magni
						omnis saepe eaque corporis nesciunt ab iste facere. Hic quia ea
						explicabo numquam.
					</p>
				</div>
			</div>
			<hr className="my-5" />
			<div className="row">
				<div className="col">
					<table className="table table-hover">
						<thead>
							<tr>
								<th scope="col">#</th>
								<th scope="col">First</th>
								<th scope="col">Last</th>
								<th scope="col">Handle</th>
								<th className='text-center'>Factures</th>
								<th className='text-center'>Montant total</th>
								<th />
							</tr>
						</thead>
						<tbody>
							<tr>
								<th scope="row">1</th>
								<td>Mark</td>
								<td>Otto</td>
								<td><a href="">@mdo</a></td>
								<td className='text-center'>
									<span className='badge bg-info text-light'>12</span>
								</td>
								<td className='text-center'>
									5 412,45 €
								</td>
								<td>
									<button 
										className='btn btn-outline-info btn-sm me-2'
									>
										<i className='fal fa-search'></i>
									</button>
									<button 
										className='btn btn-outline-warning btn-sm me-2'
									>
										<i className='fal fa-pen'></i>
									</button>
									<button 
										className='btn btn-outline-danger btn-sm'
									>
										<i className='fal fa-trash-alt'></i>
									</button>
								</td>
							</tr>
							<tr>
								<th scope="row">2</th>
								<td>Jacob</td>
								<td>Thornton</td>
								<td><a href="">@fat</a></td>
								<td className='text-center'>
									<span className='badge bg-info text-light'>24</span>
								</td>
								<td className='text-center'>
									7 820,35 €
								</td>
								<td>
									<button 
										className='btn btn-outline-info btn-sm me-2'
									>
										<i className='fal fa-search'></i>
									</button>
									<button 
										className='btn btn-outline-warning btn-sm me-2'
									>
										<i className='fal fa-pen'></i>
									</button>
									<button 
										className='btn btn-outline-danger btn-sm'
									>
										<i className='fal fa-trash-alt'></i>
									</button>
								</td>
							</tr>
							<tr>
								<th scope="row">3</th>
								<td colSpan="2">Larry the Bird</td>
								<td><a href="">@twitter</a></td>
								<td className='text-center'>
									<span className='badge bg-info text-light'>6</span>
								</td>
								<td className='text-center'>
									3 425,90 €
								</td>
								<td>
									<button 
										className='btn btn-outline-info btn-sm me-2'
									>
										<i className='fal fa-search'></i>
									</button>
									<button 
										className='btn btn-outline-warning btn-sm me-2'
									>
										<i className='fal fa-pen'></i>
									</button>
									<button 
										className='btn btn-outline-danger btn-sm'
									>
										<i className='fal fa-trash-alt'></i>
									</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
};

export default TypographyPage;
