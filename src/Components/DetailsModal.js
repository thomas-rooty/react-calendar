import React from 'react';
import "./DetailsModal.css";
import {deleteEvent} from '../services/EventsManagement';

const DetailsModal = ({event :{title, content, start, end, _id}, onClose, handleEventRefresh}) => {
    const deleteAnEvent = () => {
        deleteEvent(_id).then(res => {
            handleEventRefresh();
        })
    }
    return (
        <div id="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h1>{title}</h1>
                <p>{content}</p><br/>
                <p>Commence le : {start}</p>
                <p>Fin le : {end}</p>
                <button className="delete-button" onClick={() => deleteAnEvent()}>Supprimer</button>
            </div>
        </div>
    );
};

export default DetailsModal;