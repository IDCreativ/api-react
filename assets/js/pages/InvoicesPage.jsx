import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import InvoicesAPI from "../services/invoicesAPI";
import moment from "moment";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import TableLoader from "../components/loaders/TableLoader";

const STATUS_CLASSES = {
	PAID: "success",
	SENT: "info",
	CANCELLED: "danger",
};

const STATUS_LABELS = {
	PAID: "Payée",
	SENT: "Envoyée",
	CANCELLED: "Annulée",
};

const InvoicesPage = (props) => {
	const [invoices, setInvoices] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [search, setSearch] = useState("");
	const [loading, setLoading] = useState(true);

	const itemsPerPage = 10;

	const formatDate = (str) => moment(str).format("DD/MM/YYYY");

	// Permet de récupérer les Invoices
	const fetchInvoices = async () => {
		try {
			const data = await InvoicesAPI.findAll();
			setInvoices(data);
			setLoading(false);
		} catch (error) {
			console.error(error.response);
			toast.success("Erreur lors du chargement des factures.");
		}
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			fetchInvoices();
		}, 1000);
		return () => clearTimeout(timer);
	}, []);

	// Gestion de la suppression d'un Customer
	const handleDelete = async (id) => {
		const originalInvoices = [...invoices];

		setInvoices(invoices.filter((invoice) => invoice.id !== id));

		try {
			await InvoicesAPI.delete(id);
			toast.success("La facture a bien été supprimée.");
		} catch (error) {
			setInvoices(originalInvoices);
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

	// Filtrage des invoices en fonction de la recherche
	const filteredInvoices = invoices.filter(
		(i) =>
			i.customer.firstName.toLowerCase().includes(search.toLowerCase()) ||
			i.customer.lastName.toLowerCase().includes(search.toLowerCase()) ||
			i.amount.toString().startsWith(search.toLowerCase()) ||
			STATUS_LABELS[i.status].toLowerCase().includes(search.toLowerCase())
	);

	// Pagination des données
	const paginatedInvoices = Pagination.getData(
		filteredInvoices,
		currentPage,
		itemsPerPage
	);

	return (
		<>
			<div className="d-flex justify-content-between">
				<h1>Liste des factures</h1>
				<Link to="/invoices/new">
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
						<th className="text-center">Date d'envoi</th>
						<th className="text-center">Statut</th>
						<th className="text-center">Montant</th>
						<th />
					</tr>
				</thead>
				{!loading && (
					<tbody>
						{paginatedInvoices.map((invoice) => (
							<tr key={invoice.id}>
								<td>{invoice.chrono}</td>
								<td>
									<Link to={"/customers/" + invoice.customer.id}>
										{invoice.customer.firstName} {invoice.customer.lastName}
									</Link>
								</td>
								<td className="text-center">{formatDate(invoice.sentAt)}</td>
								<td className="text-center">
									<span
										className={
											"badge bg-" + STATUS_CLASSES[invoice.status] + " text-light"
										}
									>
										{STATUS_LABELS[invoice.status]}
									</span>
								</td>
								<td className="text-center">
									{invoice.amount.toLocaleString()} €
								</td>
								<td>
									<Link to={"/invoices/" + invoice.id} className="btn btn-outline-warning btn-sm me-2">
										<i className="fal fa-pen"></i>
									</Link>
									<button
										className="btn btn-outline-danger btn-sm"
										onClick={() => handleDelete(invoice.id)}
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

			<Pagination
				currentPage={currentPage}
				itemsPerPage={itemsPerPage}
				onPageChanged={handlePageChange}
				length={filteredInvoices.length}
			/>
		</>
	);
};

export default InvoicesPage;
