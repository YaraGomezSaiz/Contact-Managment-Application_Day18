import { myFetch } from "../fetchFunction.js";
import { useEffect } from "react";

const getState = ({ getStore, setStore }) => {
	return {
		store: {
			baseURL: "https://assets.breatheco.de/apis/fake/contact",
			agendaName: "AgendaHugo",
			contacts: []
		},
		actions: {
			createNewContact() {
				const store = getStore();
				myFetch(store.baseURL, "/", "POST", {
					full_name: "Yara Gomez",
					email: "dave@gmail.com",
					agenda_slug: "YaraGS_Agenda",
					address: "47568 NW 34ST, 33434 FL, USA",
					phone: "7864445566"
				}).then(data => {
					let arrayCopy = [...store.contacts, data];
					setStore({ contacts: arrayCopy });
				});
			},

			getAgendaContacts() {
				const store = getStore();
				myFetch(store.baseURL, "/agenda/" + store.agendaName, "GET", null).then(data =>
					setStore({ contacts: data })
				);
			},

			updateContact(id, body) {
				const store = getStore();
				myFetch(store.baseURL, "/" + id, "PUT", body).then(data => {
					let arrayCopy = [...store.contacts];
					let arrayPos = arrayCopy.findIndex(item => item.id === id);
					arrayCopy[arrayPos] = body;
					setStore({ contacts: arrayCopy });
				});
				// data => setStore({ contacts: data })
			}
			//(Arrow) Functions that update the Store
			// Remember to use the scope: scope.state.store & scope.setState()
		}
	};
};

export default getState;
