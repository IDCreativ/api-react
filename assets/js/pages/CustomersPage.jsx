import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";
import CustomersAPI from "../services/customersAPI";
import { toast } from "react-toastify";
import TableLoader from "../components/loaders/TableLoader";

const CustomersPage = (props) => {
	const [customers, setCustomers] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [search, setSearch] = useState("");
	const [loading, setLoading] = useState(true);
	const itemsPerPage = 10;

	// Permet de récupérer les Customers
	const fetchCustomers = async () => {
		try {
			const data = await CustomersAPI.findAll();
			setCustomers(data);
			setLoading(false);
		} catch (error) {
			console.error(error.response);
			toast.success("Erreur lors du chargement des clients.");
		}
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			fetchCustomers();
		}, 1000);
		return () => clearTimeout(timer);
	}, []);

	// Gestion de la suppression d'un Customer
	const handleDelete = async (id) => {
		const originalCustomers = [...customers];

		setCustomers(customers.filter((customer) => customer.id !== id));

		try {
			await CustomersAPI.delete(id);
			toast.success("Le client a bien été supprimé.");
		} catch (error) {
			setCustomers(originalCustomers);
			toast.error("Une erreur est survenue.");
		}
	};

	// Gestion du changement de page
	const handlePageChange = (page) => setCurrentPage(page);

	// Gestion de la recherche
	const handleSearch = ({ currentTarget }) => {
		setSearch(currentTarget.value);
		setCurrentPage(1);
	};

	// Filtrage des customers en fonction de la recherche
	const filteredCustomers = customers.filter(
		(c) =>
			c.firstName.toLowerCase().includes(search.toLowerCase()) ||
			c.lastName.toLowerCase().includes(search.toLowerCase()) ||
			c.email.toLowerCase().includes(search.toLowerCase()) ||
			(c.company && c.company.toLowerCase().includes(search.toLowerCase()))
	);

	// Pagination des données
	const paginatedCustomers = Pagination.getData(
		filteredCustomers,
		currentPage,
		itemsPerPage
	);

	return (
		<>
			<div className="d-flex justify-content-between">
				<h1>Liste des clients</h1>
				<Link to="/customers/new">
					<div className="btn btn-primary text-light mt-md-3">
						<i className="fal fa-plus"></i>
					</div>
				</Link>
			</div>
			<div className="form-group">
				<input
					type="text"
					onChange={handleSearch}
					value={search}
					placeholder="Rechercher ..."
					className="form-control"
				/>
			</div>
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
				{!loading && (
					<tbody>
						{paginatedCustomers.map((customer) => (
							<tr key={customer.id}>
								<td>{customer.id}</td>
								<td>
									<Link to={"/customers/" + customer.id}>
										{customer.firstName} {customer.lastName}
									</Link>
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
				)}
			</table>
			{loading && <TableLoader></TableLoader>}

			{itemsPerPage < filteredCustomers.length && (
				<Pagination
					currentPage={currentPage}
					itemsPerPage={itemsPerPage}
					length={filteredCustomers.length}
					onPageChanged={handlePageChange}
				/>
			)}
		</>
	);
};

export default CustomersPage;
