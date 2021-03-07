import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
// //Import Store,actions
import { Context } from "../store/appContext.js";

export function AddContact() {
	const { store, actions } = useContext(Context);

	let body = {
		full_name: "",
		email: "",
		agenda_slug: store.agendaName,
		address: "",
		phone: ""
	};

	function createNewContact(body) {
		actions.createNewContact(body);
	}

	return (
		<div className="container">
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
						/>
					</div>
					<div className="form-group">
						<label>Email</label>
						<input
							type="email"
							className="form-control"
							placeholder="Enter email"
							onChange={() => (body.email = event.target.value)}
						/>
					</div>
					<div className="form-group">
						<label>Phone</label>
						<input
							type="phone"
							className="form-control"
							placeholder="Enter phone"
							onChange={() => (body.phone = event.target.value)}
						/>
					</div>
					<div className="form-group">
						<label>Address</label>
						<input
							type="text"
							className="form-control"
							placeholder="Enter address"
							onChange={() => (body.address = event.target.value)}
						/>
					</div>
					<button
						type="button"
						className="btn btn-primary form-control"
						onClick={() => createNewContact(body)}>
						save
					</button>
					<Link className="mt-3 w-100 text-center" to="/">
						or get back to contacts
					</Link>
				</form>
			</div>
		</div>
	);
}
