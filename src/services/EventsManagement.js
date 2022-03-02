import React from "react";

export const getEvents = () => {
    const api = "http://localhost:5000/api/events";
    return fetch(api)
        .then(res => res.json())
        .catch(err => console.log(err));
};

export const deleteEvent = (id) => {
    const api = `http://localhost:5000/api/events/${id}`;
    return fetch(api, {
        method: "DELETE"
    })
        .then(res => res.json())
        .catch(err => console.log(err));
};

export const addEvent = (title, start, end) => {
    const api = "http://localhost:5000/api/events";
    return fetch(api, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title,
            start,
            end
        })
    })
        .then(res => res.json())
        .catch(err => console.log(err));
};