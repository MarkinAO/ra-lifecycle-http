import ChatForm from "./ChatForm";
import MessagesList from "./MessagesList";
import "./Chat.css";
import { useEffect, useState } from "react";
import { Message } from "./models";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";

export default function Chat() {
    const [list, setList] = useState<Message[]>([]);
    const [userId, setUserId] = useState('');
    const [lastId, setLastId] = useState('0');

    const updateMes = (id: string) => {
        axios.get(`http://localhost:7070/messages?from=${id}`)
            .then((res) => {                
                res.status === 200 && setList(res.data);
                const newLastId = list.length > 0 ? list[list.length - 1].id : '0';
                setLastId(newLastId || '0');
            })
            .catch((err) => {
                console.error(err);
            });
    }

    useEffect(() => {
        let id = localStorage.getItem('userId');
        if(id) {
            setUserId(id);
        } else {
            id = uuidv4();
            localStorage.setItem('userId', String(id));
            setUserId(String(id));
        }

        setInterval(() => {
            updateMes(lastId);            
        }, 100);
    }, []);

    const onSubmit = (data: Message) => {
        axios.post('http://localhost:7070/messages', {content: data.content, userId: data.userId})
    }

    return(
        <div className="crud-container">
            <MessagesList list={list} userId={userId} />
            <ChatForm onSubmit={onSubmit} userId={userId} />
        </div>
    )
}