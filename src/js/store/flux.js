import { myFetch } from "../fetchFunction.js";
import { useEffect } from "react";

const getState = ({ getStore, setStore }) => {
	return {
		store: {
			baseURL: "https://assets.breatheco.de/apis/fake/contact",
			agendas: "",
			agendaName: "YaraGS_Agenda",
			contacts: [],
			textResult: ""
		},
		actions: {
			//Obtiene todo el listado de agendas
			getAgendas() {
				const store = getStore();
				myFetch(store.baseURL, "/agenda", "GET", null).then(data => setStore({ agendas: data }));
			},

			//Guarda el nombre de la agenda
			selectAgenda(agendaName) {
				setStore({ agendaName: agendaName });
			},

			//Obtiene los contactos de una agenda
			getAgendaContacts() {
				const store = getStore();
				myFetch(store.baseURL, "/agenda/" + store.agendaName, "GET", null).then(data =>
					setStore({ contacts: data })
				);
			},

			//Genera una nueva agenda
			createNewAgenda(agendaName) {
				const store = getStore();
				let body = {
					full_name: "new Agenda",
					email: "example@gmail.com",
					agenda_slug: agendaName,
					address: "47568 NW 34ST, 33434 FL, USA",
					phone: "7864445566"
				};

				myFetch(store.baseURL, "/", "POST", body).then(data => {
					let arrayAgendas = [...store.agendas, agendaName];
					let arrayContacts = [body];
					setStore({ agendas: arrayAgendas });
					setStore({ contacts: arrayContacts });
				});
			},

			//Crear un contacto nueva en una agenda
			createNewContact(body) {
				const store = getStore();
				myFetch(store.baseURL, "/", "POST", body).then(data => {
					let arrayCopy = [...store.contacts, data];
					setStore({ contacts: arrayCopy });
					setStore({ textResult: "New contact has been created" });
				});
			},

			//Actualiza un contacto ya existente
			updateContact(body, id) {
				const store = getStore();
				myFetch(store.baseURL, "/" + id, "PUT", body).then(data => {
					let arrayCopy = [...store.contacts];
					let arrayPos = arrayCopy.findIndex(item => item.id === id);
					arrayCopy[arrayPos] = body;
					setStore({ contacts: arrayCopy });
					setStore({ textResult: "Contact has been updated" });
				});
			},

			//Borra un contacto ya existente
			deleteContact(id) {
				const store = getStore();
				myFetch(store.baseURL, "/" + id, "DELETE", null).then(data => {
					let arrayCopy = [...store.contacts];
					let arrayPos = arrayCopy.findIndex(item => item.id === id);
					arrayCopy.splice(arrayPos, 1);
					setStore({ contacts: arrayCopy });
				});
			},

			//Borra una agenda completa
			deleteAgenda() {
				const store = getStore();
				myFetch(store.baseURL, "/agenda/" + store.agendaName, "DELETE", null).then(data => {
					let arrayCopy = [...store.agendas];
					let arrayPos = arrayCopy.findIndex(item => item === store.agendaName);
					arrayCopy.splice(arrayPos, 1);
					setStore({ agendas: arrayCopy });
					let blank = [];
					setStore({ agendaName: "" });
					setStore({ contacts: blank });
				});
			},

			//Muestra el resultado de una accion por pantalla
			clearTextResult(timeout) {
				const store = getStore();
				setTimeout(() => {
					setStore({ textResult: "" });
				}, timeout);
			}
		}
	};
};

export default getState;
