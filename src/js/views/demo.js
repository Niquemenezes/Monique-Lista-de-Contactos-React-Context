import React, { useState, useEffect, useContext } from "react";
import { Link, } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashCan, faPhone, faLocationDot, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Context } from "../store/appContext";
import "../../styles/demo.css";
import { useNavigate } from "react-router-dom";

	export const Demo = () => {
		const { store, actions } = useContext(Context);
		console.log(store.contacts)
		const navigate = useNavigate();

		const [modal, setModal] = useState(false); // controla la visibilidade del modal
		const [contactToDelete, setContactToDelete]= useState(null);// el contacto que se va a eliminar

		//Funcion que muestra el modal y guarda el contacto a eliminar
		const deleteClick = (contact) => {
			setContactToDelete(contact); //guarda el contacto a eliminar
			setModal(true);//muestra el modal
		};

		//Funcion que confirma la eliminacion usando deleteContact de actions
		const confirmDelete = () => {
			if (contactToDelete) {
				actions.deleteContact(contactToDelete.id); //usamos la accion deleteContact directamente
			}
			setModal(false); //cierra el modal
		};
		const closeModal =() => {
			setModal(false);
		};

		console.log(store.contacts);  // Verifica si los contactos están llegando al store.
		
		return (
				<div className="container">
					<nav className="navbar  mb-3">
						<div className="d-flex justify-content-end w-100">
							<Link to="/">
								<button className="btn btn-success">Add new contact</button>
							</Link>
						</div>
					</nav>

				<ul className="list-group">
				{Array.isArray(store.contacts) && store.contacts.length > 0 ? (
					store.contacts.map((item, index) => {
						return (
							<li key={index} className="list-group-item d-flex justify-content-between ">
								<div className="d-flex align-items-center">
									<img src="https://picsum.photos/id/64/150/150" 	alt="Contact" className="img-circle"/>
									<div className="datos-del-contacto ml-3">
										<h3>{item.name}</h3> 
										<p>
											<FontAwesomeIcon icon={faLocationDot} style={{color: "#646464", marginRight: "10px"}} />
											{item.address}
											<br/>
											<FontAwesomeIcon icon={faPhone} flip="horizontal" style={{color: "#646464", marginRight: "10px"}} />
											{item.phone}
											<br/>
											<FontAwesomeIcon icon={faEnvelope} style={{color: "#646464", marginRight: "10px"}} />
											{item.email}
										</p>
									</div>
								</div>
								<div className="iconos">
								<FontAwesomeIcon icon={faPen} onClick={()=> navigate(`/edit/${item.id}`)} className="m-3"/>
								<FontAwesomeIcon icon={faTrashCan} onClick={()=>deleteClick(item.id)} className="m-3"/>
								</div>
						</li>
						);
					})
						
				) : (<p>No contacts found.</p> // Muestra un mensaje si no hay contactos
				)}
					</ul>

					{modal && (
					<div className="modal" tabindex="-1">
						<div className="modal-dialog">
							<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title">Modal title</h5>
								<button type="button" className="btn-close" onClick={closeModal} data-bs-dismiss="modal" aria-label="Close"></button>
							</div>
							<div className="modal-body">
								<p>Modal body text goes here.</p>
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-secondary" onClick={closeModal} data-bs-dismiss="modal">Close</button>
								<button type="button" className="btn btn-primary" onClick={confirmDelete}>Save changes</button>
							</div>
							</div>
						</div>
						</div>
					)}			
				</div>
			);
		};
