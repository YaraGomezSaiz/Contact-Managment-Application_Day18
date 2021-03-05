import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
//Import Store,actions
import { Context } from "../store/appContext.js";

import { ContactCard } from "../component/ContactCard.js";
import { Modal } from "../component/Modal";

export const Contacts = () => {
	const [state, setState] = useState({ showModal: false });
	const { store, actions } = useContext(Context);

	useEffect(() => {
		actions.getAgendaContacts();
	}, []);

	return (
		<div className="container">
			{store.contacts !== null ? (
				<div>
					<p className="text-right my-3">
						<Link className="btn btn-success" to="/add">
							Add new contact
						</Link>
					</p>
					<div id="contacts" className="panel-collapse collapse show" aria-expanded="true">
						<ul className="list-group pull-down" id="contact-list">
							{store.contacts.map(contact => {
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
			<Modal show={state.showModal} onClose={() => setState({ showModal: false })} />
		</div>
	);
};
