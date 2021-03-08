import React, { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
// //Import Store,actions
import { Context } from "../store/appContext.js";
import PropTypes from "prop-types";

export function AddContact(props) {
	const { store, actions } = useContext(Context);
	//recibe props a traves de un Link
	let location = useLocation();
	let id = "";
	let body = {
		full_name: "",
		email: "",
		agenda_slug: store.agendaName,
		address: "",
		phone: ""
	};

	//Si recibe algun parametro por link alamcena el valor del contacto,
	//si no lo recibe es porque es nuevo
	if (location.state != undefined) {
		body = location.state.body;
		id = location.state.id;
	}

	useEffect(
		() => {
			actions.clearTextResult(2000);
		},
		[store.textResult != ""]
	);

	return (
		<div className="container">
			{store.agendaName !== "" ? (
				<div>
					<h1 className="text-center mt-5">Add a new contact</h1>
					<form>
						<div className="form-group">
							<label>Full Name</label>
							<input
								type="text"
								className="form-control"
								placeholder="Full Name"
								onChange={() => (body.full_name = event.target.value)}
								defaultValue={body.full_name}
							/>
						</div>
						<div className="form-group">
							<label>Email</label>
							<input
								type="email"
								className="form-control"
								placeholder="Enter email"
								onChange={() => (body.email = event.target.value)}
								defaultValue={body.email}
							/>
						</div>
						<div className="form-group">
							<label>Phone</label>
							<input
								type="phone"
								className="form-control"
								placeholder="Enter phone"
								onChange={() => (body.phone = event.target.value)}
								defaultValue={body.phone}
							/>
						</div>
						<div className="form-group">
							<label>Address</label>
							<input
								type="text"
								className="form-control"
								placeholder="Enter address"
								onChange={() => (body.address = event.target.value)}
								defaultValue={body.address}
							/>
						</div>

						{location.state === undefined ? (
							<button
								type="button"
								className="btn btn-primary form-control"
								onClick={() => actions.createNewContact(body)}>
								save
							</button>
						) : (
							<button
								type="button"
								className="btn btn-primary form-control"
								onClick={() => actions.updateContact(body, id)}>
								Update Contact
							</button>
						)}

						<Link className="mt-3 w-100 text-center" to="/">
							or get back to contacts
						</Link>
						<p className="mt-3 w-100 text-right">
							<strong>{store.textResult}</strong>
						</p>
					</form>
				</div>
			) : (
				<h3 className="text-center mt-5">Select Agenda first</h3>
			)}
		</div>
	);
}

AddContact.propTypes = {
	editContact: PropTypes.number,
	body: PropTypes.object
};
