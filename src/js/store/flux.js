import { myFetch } from "../fetchFunction.js";
import { useEffect } from "react";

const getState = ({ getStore, setStore }) => {
	return {
		store: {
			baseURL: "https://assets.breatheco.de/apis/fake/contact",
			agendas: [],
			agendaName: "",
			contacts: []
		},
		actions: {
			getAgendas() {
				const store = getStore();
				myFetch(store.baseURL, "/agenda", "GET", null).then(data => setStore({ agendas: data }));
			},

			selectAgenda(agendaName) {
				setStore({ agendaName: agendaName });
			},

			getAgendaContacts() {
				const store = getStore();
				myFetch(store.baseURL, "/agenda/" + store.agendaName, "GET", null).then(data =>
					setStore({ contacts: data })
				);
			},

			createNewAgenda() {
				const store = getStore();
				myFetch(store.baseURL, "/", "POST", {
					full_name: "new Agenda",
					email: "example@gmail.com",
					agenda_slug: store.agendaName,
					address: "47568 NW 34ST, 33434 FL, USA",
					phone: "7864445566"
				}).then(data => {
					let arrayCopy = [...store.agendas, data];
					setStore({ agendas: arrayCopy });
				});
			},

			createNewContact(body) {
				const store = getStore();
				myFetch(store.baseURL, "/", "POST", body).then(data => {
					let arrayCopy = [...store.contacts, data];
					setStore({ contacts: arrayCopy });
				});
			},

			updateContact(id, body) {
				const store = getStore();
				myFetch(store.baseURL, "/" + id, "PUT", body).then(data => {
					let arrayCopy = [...store.contacts];
					let arrayPos = arrayCopy.findIndex(item => item.id === id);
					arrayCopy[arrayPos] = body;
					setStore({ contacts: arrayCopy });
				});
			},

			deleteContact(id) {
				const store = getStore();
				myFetch(store.baseURL, "/" + id, "DELETE", null).then(data => {
					let arrayCopy = [...store.contacts];
					let arrayPos = arrayCopy.findIndex(item => item.id === id);
					arrayCopy.splice(arrayPos, 1);
					setStore({ contacts: arrayCopy });
				});
			},

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
			}
			//(Arrow) Functions that update the Store
			// Remember to use the scope: scope.state.store & scope.setState()
		}
	};
};

export default getState;
