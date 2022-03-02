import React from "react";

export const getTodos = () => {
    const api = "http://localhost:5000/api/events";
    return fetch(api)
        .then(res => res.json())
        .catch(err => console.log(err));
};

export const getTodosByDate = (date) => {
    const api = `http://localhost:5000/api/events/${date}`;
    return fetch(api)
        .then(res => res.json())
        .catch(err => console.log(err));
};