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
	cons[(showAvailableAgendas, setshowAvailableAgendas)] = useContext(false);

	useEffect(() => {
		actions.getAgendas();
	}, []);

	function showAgenda(agendaName) {
		actions.selectAgenda(agendaName);
		actions.getAgendaContacts();
	}

	return (
		<div className="container">
			<p className="text-left my-3" />
			<div className="selectAgenda">
				<h5>
					Select Agenda
					{/* <button onClick={setshowAvailableAgendas(!showAvailableAgendas)} >
						<FontAwesomeIcon icon={faAddressCard} />
					</button> */}
					<button>
						<FontAwesomeIcon icon={faPlusSquare} />
					</button>
				</h5>

				{/* {showAvailableAgendas ? ("") : ("")} */}
				<select name="Agendas" onChange={event => showAgenda(event.target.value)}>
					{store.agendas.map((agenda, index) => {
						return (
							<option key={index} value={agenda}>
								{agenda}
							</option>
						);
					})}
				</select>
				<button>+</button>
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
