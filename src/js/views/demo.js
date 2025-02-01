import React, { useEffect, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashCan, faPhone, faLocationDot, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Context } from "../store/appContext";
import "../../styles/demo.css";
import { useNavigate } from "react-router-dom";


	export const Demo = () => {
		const { store, actions } = useContext(Context);
		const navigate = useNavigate();

		
		const [showModal, setShowModal] = useState(false);
		const [contactToDelete, setContactToDelete] = useState(null);

		useEffect(() => {
			actions.obtenerContacts(); // Cargar contactos al montar el componente
		}, []);

		const handleClose = () => setShowModal(false);
		const handleShow = (contactId) => {
			setContactToDelete(contactId);
			setShowModal(true);
		};

		const confirmDelete = () => {
			actions.deleteContact(contactToDelete);
			setShowModal(false);
		}

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
								<FontAwesomeIcon icon={faTrashCan} onClick={()=>handleShow(item.id)} className="m-3"/>
								</div>
							</li>
						);
					})
				) : (<p>No contacts found.</p> // Muestra un mensaje si no hay contactos
				)}
			</ul>

			<div className={`modal ${showModal ? 'd-block' : 'd-none'}`} tabindex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Are you sure?</h5>
                            <button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>If you delete this thing the entire universe will go down!</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={handleClose}>Oh no!</button>
                            <button type="button" className="btn btn-secondary" onClick={confirmDelete}>Yes baby!</button>
                        </div>
                    </div>
                </div>
            </div>


		</div>
	);
};
