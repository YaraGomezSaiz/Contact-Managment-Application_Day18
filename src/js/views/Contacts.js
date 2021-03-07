import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
//Import Store,actions
import { Context } from "../store/appContext.js";
//Import Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard } from "@fortawesome/free-regular-svg-icons";
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";

import { ContactCard } from "../component/ContactCard.js";
import { Modal } from "../component/Modal";

export const Contacts = () => {
	const [state, setState] = useState({ showModal: false });
	const { store, actions } = useContext(Context);
	const [showAvailableAgendas, setshowAvailableAgendas] = useState(false);
	const [addNewAgenda, setAddNewAgenda] = useState(false);
	let contactUser = "";
	let agendaNameInput = "";

	useEffect(() => {
		actions.getAgendas();
	}, []);

	function showAgenda(agendaName) {
		actions.selectAgenda(agendaName);
		actions.getAgendaContacts();
		setshowAvailableAgendas(false);
		setAddNewAgenda(false);
	}

	function createNewAgenda(agendaName) {
		setshowAvailableAgendas(false);
		actions.selectAgenda(agendaName);
		actions.createNewAgenda();
		setAddNewAgenda(false);
		actions.getAgendaContacts();
	}

	return (
		<div className="container">
			<p className="text-left my-3" />
			<div className="selectAgenda">
				<button onClick={() => setshowAvailableAgendas(!showAvailableAgendas)}>
					<FontAwesomeIcon icon={faAddressCard} />
				</button>
				<button onClick={() => setAddNewAgenda(!addNewAgenda)}>
					<FontAwesomeIcon icon={faPlusSquare} />
				</button>
				{store.agendaName != "" ? <button onClick={() => actions.deleteAgenda()}>Delete Agenda</button> : ""}

				{addNewAgenda ? (
					<input
						className="AgendaName"
						type="text"
						placeholder="Agenda Name"
						onChange={event => (agendaNameInput = event.target.value)}
						onKeyDown={event => (event.key === "Enter" ? createNewAgenda(agendaNameInput) : null)}
					/>
				) : (
					""
				)}
				<h6> Agenda: {store.agendaName} </h6>

				{showAvailableAgendas ? (
					<select name="Agendas" onChange={event => showAgenda(event.target.value)}>
						{store.agendas.map((agenda, index) => {
							return (
								<option key={index} value={agenda}>
									{agenda}
								</option>
							);
						})}
					</select>
				) : (
					""
				)}
			</div>
			<p className="text-right my-3">
				<Link className="btn btn-success" to="/add">
					Add new contact
				</Link>
			</p>
			{store.contacts !== null ? (
				<div>
					<div id="contacts" className="panel-collapse collapse show" aria-expanded="true">
						<ul className="list-group pull-down" id="contact-list">
							{store.contacts.map(contact => {
								contactUser = contact;
								return (
									<ContactCard
										key={contact.id}
										contact={contact}
										onDelete={() => setState({ showModal: true })}
									/>
								);
							})}
						</ul>
					</div>
				</div>
			) : (
				""
			)}
			<Modal contact={contactUser} show={state.showModal} onClose={() => setState({ showModal: false })} />
		</div>
	);
};
