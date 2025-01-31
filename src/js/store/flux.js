const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts: []
		},
		actions: {
			
			// Obtener contactos
			obtenerContacts: () => {
				fetch('https://playground.4geeks.com/contact/agendas/Monique/contacts', {
					method: "GET",
					headers: { "Content-Type": "application/json" },
				})
				.then((response) => {
					console.log("API response:", response);
					if (!response.ok) {
						return response.text().then(text => { throw new Error(`Error: ${response.status} - ${text}`) });
					}
					return response.json();
				})
				.then((data) => {
					console.log("Datos recibidos de la API:", data);
					if (Array.isArray(data.contacts)) {
						setStore({ contacts: data.contacts });
					} else {
						setStore({ contacts: [] });
					}
				})
				.catch(error => console.error("Error procesando datos:", error));
			},
			

			// Agregar contacto al store
			addContactToContacts: (contact) => {
				const store = getStore();
				setStore({ contacts: [...store.contacts, contact] });
			},

			// Crear contacto
			createContact: (payload) => {
				fetch("https://playground.4geeks.com/contact/agendas/Monique/contacts", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(payload),
				})
				.then((response) => {
					if (!response.ok) {
						throw new Error("Error al crear el contacto");
					}
					return response.json();
				})
				.then((data) => {
					const actions = getActions();
					actions.addContactToContacts(data);
					console.log("Contacto agregado:", data);
				})
				.then(() => {
					getActions().obtenerContacts();
				})
				
			},

			// Eliminar contacto
			deleteContact: (id) => {
				console.log("Intentando eliminar el contacto con ID:",id);
				//Eliminacion del contacto en la API
				fetch(`https://playground.4geeks.com/contact/agendas/Monique/contacts/${id}`, {
					method: "DELETE",
					headers: { "Content-Type": "application/json" }
				})
				.then((response) => {
					if (!response.ok) {
						throw new Error("Error al eliminar el contacto");
					}
					 // Verifica si la respuesta tiene cuerpo
					 if (response.status === 204) {
						console.log(`Contacto con ID ${id} eliminado correctamente`);
					  } else {
					return response.json();
					  }
				})
				.then(() => {
					//actualizar el store local para eliminar el contacto de la lista
					const store = getStore();
					const updatedContacts = store.contacts.filter(contact => contact.id !== id);
					setStore({ contacts: updatedContacts });
					console.log(`Contacto con ID ${id} eliminado`);
				})
				.then(() => {
					// Después de eliminarlo localmente, actualiza los contactos desde la API
					getActions().obtenerContacts();
				  });
				
			},

			// Editar contacto
			changeContact: (id, updatedContact) => {
				fetch(`https://playground.4geeks.com/contact/agendas/Monique/contacts/${id}`, {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(updatedContact)
				})
				.then((response) => {
					if (!response.ok) {
						throw new Error("Error al actualizar el contacto");
					}
					console.log(`Contacto con ID ${id} actualizado`);
					//  Volvemos a cargar los contactos para asegurar que estén actualizados
					return fetch("https://playground.4geeks.com/contact/agendas/Monique/contacts");
				})
				.then(response => response.json())
				.then(data => {
					setStore({ contacts: data.contacts });
				})
				.catch((error) => console.error("Error:", error));
			},
		}
	};
};

export default getState;

