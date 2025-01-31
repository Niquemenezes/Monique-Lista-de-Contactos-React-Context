import React, { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashCan, faPhone, faLocationDot, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Context } from "../store/appContext";
import "../../styles/demo.css";


	export const Demo = () => {
		const { store, actions } = useContext(Context);
		const navigate = useNavigate();
	
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
								<FontAwesomeIcon icon={faTrashCan} onClick={()=>actions.deleteContact(item.id)} className="m-3"/>
								</div>
							</li>
						);
					})
				) : (<p>No contacts found.</p> // Muestra un mensaje si no hay contactos
				)}
			</ul>
		</div>
	);
};
