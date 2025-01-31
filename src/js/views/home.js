import React, { useContext, useEffect, useState } from "react";
import "../../styles/home.css";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";


export const Home = () => {
    const {id} = useParams(); // obtener el id contacto desde la URL
    const {store, actions} = useContext(Context);
    
    const initialInputs = {
        name: "",
        email: "",
        phone: "",
        address: ""
        };
    
    const [inputs, setInputs] = useState(initialInputs);

  

        const handleSubmit = (e) => {
            e.preventDefault();
            if (id) {
              // Si hay un ID, estamos editando el contacto
              actions.changeContact(id, inputs);
            } else {
              // Si no hay ID, estamos creando un nuevo contacto
              actions.createContact(inputs);
            }
          
          };
    

        const changeInputs = (e) => {
            setInputs({...inputs, [e.target.name]: e.target.value});
        };
     

    return (
        <div className="container">
            <form className="container-fluid" onSubmit={handleSubmit}>
                <h1 className="text-center">{id ? "Edit Contact" : "Add a New Contact"}</h1>
                <div className="m-3">
                    <label htmlFor="username" className="form-label">Full Name</label>
                    <input type="text" value={inputs.name} onChange={changeInputs} name="name" className="form-control" id="name" placeholder="Full Name"/>
                </div>
                <div className="m-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" value={inputs.email} onChange={changeInputs} name="email" className="form-control" id="email" placeholder="Enter email"/>
                </div>
                <div className="m-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input type="text" value={inputs.phone} onChange={changeInputs} name="phone" className="form-control" id="phone" placeholder="Enter phone"/>
                </div>
                <div className="m-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input type="text" value={inputs.address} onChange={changeInputs} name="address" className="form-control" id="address" placeholder="Enter Address"/>
                </div>
                <div className="m-3 mb-0">
                    <button type="submit" className="btn btn-primary w-100">Save</button>
                </div>
                <Link to="/demo" className="d-block m-3 mt-0">Or get back to contact</Link>
            </form>
        </div>
    );
};
