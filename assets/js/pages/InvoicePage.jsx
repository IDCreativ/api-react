import React, { useState, useEffect } from "react";
import Field from "../components/forms/Field";
import Select from "../components/forms/Select";
import { Link } from "react-router-dom";
import CustomersAPI from "../services/customersAPI";
import InvoicesAPI from "../services/invoicesAPI";
import { toast } from "react-toastify";
import FormContentLoader from "../components/loaders/FormContentLoader";

const InvoicePage = ({ history, match }) => {
	const { id = "new" } = match.params;

	const [invoice, setInvoice] = useState({
		amount: "",
		customer: "",
		status: "SENT",
	});

	const [customers, setCustomers] = useState([]);
	const [editing, setEditing] = useState(false);
	const [loading, setLoading] = useState(false);

	const [errors, setErrors] = useState({
		amount: "",
		customer: "",
		status: "",
	});

	// Récupération des clients
	const fetchCustomers = async () => {
		try {
			const data = await CustomersAPI.findAll();
			setCustomers(data);
			setLoading(false);
			if (!invoice.customer && id === "new") {
				setInvoice({ ...invoice, customer: data[0].id });
			}
		} catch (error) {
			console.log(error.response);
			toast.error("Impossible de charger les clients");
			history.replace("/invoices");
		}
	};

	// Récupération d'une facture
	const fetchInvoice = async (id) => {
		try {
			const { amount, status, customer } = await InvoicesAPI.find(id);
			setInvoice({ amount, status, customer: customer.id });
			setLoading(false);
		} catch (error) {
			toast.error("Impossible de charger la facture demandée");
			history.replace("/invoices");
		}
	};

	useEffect(() => {
		setLoading(true);
		const timer = setTimeout(() => {
			fetchCustomers();
		}, 1000);
		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		if (id !== "new") {
			setEditing(true);
			const timer = setTimeout(() => {
				fetchInvoice(id);
			}, 1000);
			return () => clearTimeout(timer);
		}
	}, [id]);

	const handleChange = ({ currentTarget }) => {
		const { name, value } = currentTarget;
		setInvoice({ ...invoice, [name]: value });
	};

	// Gestion de la soumission du formulaire
	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			if (editing) {
				const response = await InvoicesAPI.update(id, invoice);
				toast.success("La facture a bien été modifiée.");
				history.replace("/invoices");
			} else {
				const response = await InvoicesAPI.create(invoice);
				toast.success("La facture a bien été créée.");
				history.replace("/invoices");
			}
			setErrors({});
		} catch ({ response }) {
			const { violations } = response.data;
			if (violations) {
				const apiErrors = {};
				violations.forEach(({ propertyPath, message }) => {
					apiErrors[propertyPath] = message;
				});

				setErrors(apiErrors);
				toast.error("Votre formulaire contient des erreurs.");
			}
		}
	};

	return (
		<>
			{(!editing && <h1>Création d'une facture</h1>) || (
				<h1>Modification d'une facture</h1>
			)}
			{loading && <FormContentLoader />}

			{!loading && (
				<form onSubmit={handleSubmit}>
					<Field
						name="amount"
						type="number"
						placeholder="Montant de la facture"
						label="Montant"
						onChange={handleChange}
						value={invoice.amount}
						error={errors.amount}
					/>

					<Select
						name="customer"
						label="Client"
						value={invoice.customer}
						error={errors.customer}
						onChange={handleChange}
					>
						{customers.map((customer) => (
							<option key={customer.id} value={customer.id}>
								{customer.firstName} {customer.lastName}
							</option>
						))}
					</Select>

					<Select
						name="status"
						label="Statut"
						value={invoice.status}
						error={errors.status}
						onChange={handleChange}
					>
						<option value="SENT">Envoyée</option>
						<option value="PAID">Payée</option>
						<option value="CANCELLED">Annulée</option>
					</Select>

					<div className="form-group">
						<button type="submit" className="btn btn-success text-light">
							Enregistrer
						</button>
					</div>
				</form>
			)}

			<div className="row mt-3">
				<div className="col">
					<Link to="/invoices">
						<i className="fal fa-long-arrow-left me-1"></i>Retour à la liste
					</Link>
				</div>
			</div>
		</>
	);
};

export default InvoicePage;
