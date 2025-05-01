import { useState } from 'react';
import TitleContainer from "../../../components/titleContainer/TitleContainer";
import {Checkbox, FormControlLabel, TextField, Button} from "@mui/material";
import api from "../../../api";
import {useSection} from "../../../contexts/SectionProvider";
import {log} from "qrcode/lib/core/galois-field";

const AddEvent = () => {
    const { sectionId } = useSection();

    // state varijable za svaki input
    const [name, setName] = useState('');
    const [date,  setDate]  = useState('');
    const [points,setPoints]= useState('');
    const [notify, setNotify] = useState(false);

    const handleCreate = async () => {
        // ovdje su ti već vrijednosti iz inputa
        await api.post(`sections/${sectionId}/event`, {
            name: name,
            date: date,
            idEventType: points,
            description: "Fake.",
        })
            .then(response => {
                console.log("Successfully created new event!", response.data);
            })
            .catch(error => {
                console.log("Error creating new post: ", error)
            })
    }

    return (
        <div className='container'>
            <TitleContainer title={"Novi event"} description={"Dodavanje novih evenata"} />

            <TextField
                label="Naslov"
                value={name}
                onChange={e => setName(e.target.value)}
                style={{ width: "90%", margin: "10px 0" }}
            />

            <TextField
                label="Datum"
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                style={{ width: "90%", margin: "10px 0" }}
            />

            <TextField
                label="Broj bodova"
                value={points}
                onChange={e => setPoints(e.target.value)}
                style={{ width: "90%", margin: "10px 0" }}
            />

            <Button
                variant="contained"
                color="primary"
                style={{ width: "90%", margin: "10px 0" }}
                onClick={handleCreate}
            >
                Create Event
            </Button>
        </div>
    );
};

export default AddEvent;