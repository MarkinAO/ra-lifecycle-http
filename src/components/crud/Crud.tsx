import { useEffect, useState } from "react";
import "./Crud.css";
import Notes from "./Notes";
import CrudForm from "./CrudForm";
import refresh from "./img/refresh.svg";
import axios from "axios";
import { Note } from "./models";

export default function Crud() {
    let [notes, setNotes] = useState<Note[]>([]);

    const getNotes = () => {
        axios.get('http://localhost:7070/notes').then((res) => {
                res.status === 200 && setNotes(res.data);
            }).catch((err) => {
                console.error(err);
            });
    }

    useEffect(() => {
        getNotes();
    }, []);

    const onSubmit = (data: string) => {
        axios.post('http://localhost:7070/notes', {content: data})
        .then((res) => {
            res.status === 204 && getNotes();
        })
        .catch((err) => console.error(err));
    }

    const deleteNote = (id: string) => {
        const url = `http://localhost:7070/notes/${id}`;
        axios.delete(url)
         .then((res) => {
            res.status === 204 && getNotes();
         });        
    }

    const onClickRefresh = (event: any) => {
        event?.target.classList.add('rotate');
        getNotes();
        setTimeout(() => {event?.target.classList.remove('rotate')}, 1000);
    }

    return(
        <div className="crud-container">
            <div className="crud-title">
                <h2>Notes</h2>
                <button className="crud-refresh" onClick={(event) => onClickRefresh(event)}>
                    <img src={refresh} />
                </button>
            </div>
            <Notes notes={notes} deleteNote={deleteNote} />
            <CrudForm onSubmit={onSubmit} />
        </div>
    )
}