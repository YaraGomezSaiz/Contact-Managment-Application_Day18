import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import MikePhoto from "../../img/m101.jpg";
//Import Store,actions
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";

import { AddContact } from "../views/AddContact.js";
import { Modal } from "./Modal.js";

export const ContactCard = props => {
	const { store, actions } = useContext(Context);
	const [state, setState] = useState({ showModal: false });

	let body = {
		full_name: props.contact.full_name,
		email: props.contact.email,
		agenda_slug: store.agendaName,
		address: props.contact.address,
		phone: props.contact.phone
	};

	return (
		<li className="list-group-item">
			<div className="row w-100">
				<div className="col-12 col-sm-6 col-md-3 px-0">
					<img src={MikePhoto} alt="Mike Anamendolla" className="rounded-circle mx-auto d-block img-fluid" />
				</div>
				<div className="col-12 col-sm-6 col-md-9 text-center text-sm-left">
					<div className=" float-right">
						<Link className="btn" to={{ pathname: "/edit", state: { body: body, id: props.contact.id } }}>
							<i className="fas fa-pencil-alt mr-3" />
						</Link>

						<button className="btn" onClick={() => actions.updateContact(props.contact.id, body)} />
						<button className="btn" onClick={() => setState({ showModal: true })}>
							<i className="fas fa-trash-alt" />
						</button>
					</div>
					<label className="name lead">{props.contact.full_name}</label>
					<br />
					<i className="fas fa-map-marker-alt text-muted mr-3" />
					<span className="text-muted">{props.contact.address}</span>
					<br />
					<span
						className="fa fa-phone fa-fw text-muted mr-3"
						data-toggle="tooltip"
						title=""
						data-original-title="(870) 288-4149"
					/>
					<span className="text-muted small">{props.contact.phone}</span>
					<br />
					<span className="text-muted small">{props.contact.id}</span>
					<br />
					<span
						className="fa fa-envelope fa-fw text-muted mr-3"
						data-toggle="tooltip"
						data-original-title=""
						title=""
					/>
					<span className="text-muted small text-truncate">{props.contact.email}</span>
				</div>
			</div>
			<Modal contact={props.contact} show={state.showModal} onClose={() => setState({ showModal: false })} />
		</li>
	);
};

/**
 * Define the data-types for
 * your component's properties
 **/
ContactCard.propTypes = {
	history: PropTypes.object,
	onDelete: PropTypes.func,
	contact: PropTypes.object
};

/**
 * Define the default values for
 * your component's properties
 **/
ContactCard.defaultProps = {
	onDelete: null
};
