import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../components/Pagination";

const CustomersPageWithPagination = (props) => {
	const [customers, setCustomers] = useState([]);
	const [totalItems, setTotalItems] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [loading, setLoading] = useState(true);
	const itemsPerPage = 10;

	useEffect(() => {
		axios
			.get(
				`https://localhost:8000/api/customers?pagination=true&count=${itemsPerPage}&page=${currentPage}`
			)
			.then((response) => {
				setCustomers(response.data["hydra:member"]);
				setTotalItems(response.data["hydra:totalItems"]);
				setLoading(false);
			})
			.catch((error) => console.error(error.response));
	}, [currentPage]);

	const handleDelete = (id) => {
		const originalCustomers = [...customers];

		setCustomers(customers.filter((customer) => customer.id !== id));

		axios
			.delete("https://localhost:8000/api/customers/" + id)
			.then((response) => console.log("Ok, élément bien supprimé."))
			.catch((error) => {
				setCustomers(originalCustomers);
				console.error(error.response);
			});
	};

	const handlePageChange = (page) => {
		setLoading(true);
		setCurrentPage(page);
	};

	const paginatedCustomers = Pagination.getData(
		customers,
		currentPage,
		itemsPerPage
	);

	return (
		<>
			<h1>Liste des clients</h1>

			<table className="table table-hover">
				<thead>
					<tr>
						<th>#</th>
						<th>Client</th>
						<th>E-mail</th>
						<th>Entreprise</th>
						<th className="text-center">Factures</th>
						<th className="text-center">Montant total</th>
						<th />
					</tr>
				</thead>
				<tbody>
					{loading && (
						<tr>
							<td>Chargement ...</td>
						</tr>
					)}
					{!loading &&
						customers.map((customer) => (
							<tr key={customer.id}>
								<td>{customer.id}</td>
								<td>
									<a href="#">
										{customer.firstName} {customer.lastName}
									</a>
								</td>
								<td>{customer.email}</td>
								<td>{customer.company ? customer.company : "N/A"}</td>
								<td className="text-center">
									<span className="badge bg-info text-light">
										{customer.invoices.length}
									</span>
								</td>
								<td className="text-center">
									{customer.totalAmount.toLocaleString()} €
								</td>
								<td>
									<button
										className="btn btn-outline-danger btn-sm"
										onClick={() => handleDelete(customer.id)}
										disabled={customer.invoices.length > 0 ? true : false}
									>
										<i className="fal fa-trash-alt"></i>
									</button>
								</td>
							</tr>
						))}
				</tbody>
			</table>

			<Pagination
				currentPage={currentPage}
				itemsPerPage={itemsPerPage}
				length={totalItems}
				onPageChanged={handlePageChange}
			/>
		</>
	);
};

export default CustomersPageWithPagination;
