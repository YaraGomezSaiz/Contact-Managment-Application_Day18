import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
//Import Store,actions
import { Context } from "../store/appContext.js";
//Import Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard } from "@fortawesome/free-regular-svg-icons";
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";

//import css

import "../../styles/home.scss";

export default function Navbar() {
	const { store, actions } = useContext(Context);
	const [showAvailableAgendas, setshowAvailableAgendas] = useState(false);
	const [addNewAgenda, setAddNewAgenda] = useState(false);
	let agendaNameInput = "";

	useEffect(
		() => {
			actions.getAgendas();
		},
		[store.agendas === ""]
	);

	//borrar
	useEffect(() => {
		actions.getAgendaContacts();
	}, []);

	function showAgenda(agendaName) {
		//Guarda el nombre de la agenda
		actions.selectAgenda(agendaName);
		actions.getAgendaContacts();
		setshowAvailableAgendas(false);
		setAddNewAgenda(false);
	}

	function createNewAgenda(agendaName) {
		setshowAvailableAgendas(false);
		//Guarda el nombre de la agenda
		actions.selectAgenda(agendaName);
		// Crea la nueva agenda
		actions.createNewAgenda(agendaName);
		setAddNewAgenda(false);
	}

	return (
		<nav className="navbar navbar-light bg-light mb-3">
			<div className="container">
				<p className="text-left my-3" />
				<div className="selectAgenda">
					<strong>Select Agenda {"   "}</strong>
					<button className="button" onClick={() => setshowAvailableAgendas(!showAvailableAgendas)}>
						<FontAwesomeIcon icon={faAddressCard} />
					</button>
					<button className="button" onClick={() => setAddNewAgenda(!addNewAgenda)}>
						<FontAwesomeIcon icon={faPlusSquare} />
					</button>
					{store.agendaName != "" ? (
						<button className="button" onClick={() => actions.deleteAgenda()}>
							<i className="fas fa-trash-alt" />
						</button>
					) : (
						""
					)}
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
			</div>
		</nav>
	);
}
