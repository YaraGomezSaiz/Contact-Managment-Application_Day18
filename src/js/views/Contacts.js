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
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
			<p className="text-left my-3" />

			<p className="text-right">
				<Link className="btn btn-success" to="/add">
					<i className="fas fa-user-plus" />
				</Link>
			</p>
			{store.contacts !== null ? (
				<div>
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
		</div>
	);
};
