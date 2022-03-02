import React from 'react';
import "./DetailsModal.css";
import {deleteEvent} from '../services/EventsManagement';

const DetailsModal = ({event :{title, content, start, end, _id}, onClose}) => {
    return (
        <div id="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h1>{title}</h1>
                <p>{content}</p><br/>
                <p>Commence le : {start}</p>
                <p>Fin le : {end}</p>
                <button className="delete-button" onClick={() => deleteEvent(_id)}>Supprimer</button>
            </div>
        </div>
    );
};

export default DetailsModal;