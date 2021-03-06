import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Field from "../components/forms/Field";
import customersAPI from "../services/customersAPI";
import { toast } from "react-toastify";
import FormContentLoader from "../components/loaders/FormContentLoader";

const CustomerPage = ({ history, match }) => {
	const { id = "new" } = match.params;

	const [customer, setCustomer] = useState({
		lastName: "",
		firstName: "",
		email: "",
		company: "",
	});

	const [errors, setErrors] = useState({
		lastName: "",
		firstName: "",
		email: "",
		company: "",
	});

	const [loading, setLoading] = useState(false);
	const [editing, setEditing] = useState(false);

	// Récupération du customer en focntion de l'identifiant
	const fetchCustomer = async (id) => {
		try {
			const { firstName, lastName, email, company } = await customersAPI.find(
				id
			);
			setCustomer({ firstName, lastName, email, company });
			setLoading(false);
		} catch (error) {
			history.replace("/customers");
			toast.error("Une erreur est survenue.");
		}
	};
	// Chargement du customer si besoin au chargement du composant ou au changement de l'identifiant
	useEffect(() => {
		if (id !== "new") {
			setLoading(true);
			setEditing(true);
			const timer = setTimeout(() => {
				fetchCustomer(id);
			}, 1000);
			return () => clearTimeout(timer);
		}
	}, [id]);

	// Gestion des changements des inputs dans le formulaire
	const handleChange = ({ currentTarget }) => {
		const { name, value } = currentTarget;
		setCustomer({ ...customer, [name]: value });
	};

	// Gestion de la soumission du formulaire
	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			if (editing) {
				await customersAPI.update(id, customer);
				toast.success("Le client a bien été modifié.");
				history.replace("/customers");
			} else {
				await customersAPI.create(customer);
				toast.success("Le client a bien été créé.");
				history.replace("/customers");
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
				toast.error("Une erreur est survenue.");
			}
		}
	};

	return (
		<>
			{(!editing && <h1>Création d'un client</h1>) || (
				<h1>Modification d'un client</h1>
			)}

			{loading && <FormContentLoader />}

			{!loading && (
				<form onSubmit={handleSubmit}>
					<Field
						name="lastName"
						label="Nom"
						placeholder="Nom"
						value={customer.lastName}
						onChange={handleChange}
						error={errors.lastName}
					/>
					<Field
						name="firstName"
						label="Prénom"
						placeholder="Prénom"
						value={customer.firstName}
						onChange={handleChange}
						error={errors.firstName}
					/>
					<Field
						name="email"
						label="E-mail"
						placeholder="E-mail"
						value={customer.email}
						onChange={handleChange}
						error={errors.email}
					/>
					<Field
						name="company"
						label="Entreprise"
						placeholder="Entreprise"
						value={customer.company}
						onChange={handleChange}
						error={errors.company}
					/>

					<div className="form-group mt-3">
						<button type="submit" className="btn btn-success text-light">
							Enregistrer
						</button>
					</div>
				</form>
			)}

			<div className="row mt-3">
				<div className="col">
					<Link to="/customers">
						<i className="fal fa-long-arrow-left me-1"></i>Retour à la liste
					</Link>
				</div>
			</div>
		</>
	);
};

export default CustomerPage;
