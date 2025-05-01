import {useEffect, useState} from 'react';
import TitleContainer from "../../../components/titleContainer/TitleContainer";
import {Checkbox, FormControlLabel, TextField, Button} from "@mui/material";
import api from "../../../api";
import {useSection} from "../../../contexts/SectionProvider";
import {log} from "qrcode/lib/core/galois-field";
import {useParams} from "react-router-dom";

const AddSection = () => {
    const {id} = useParams();

    // state varijable za svaki input
    const [name, setName] = useState('');
    const [description,  setDescription]  = useState('');

    useEffect(() => {
        async function fetchData() {
            const section = { id: 1, name: "Proljetni semestar 2025", description: "2025-02-01"}
            setName(section.name);
            setDescription(section.description);
            /*await api.get(`/semesters/${id}`)
                .then(response => {
                    setName(response.data.name);
                    setDateFrom(response.data.description);
                })
                .catch(error => {
                    console.log("Error fetching data: ", error);
                })*/
        }
        if (id) fetchData();
    }, []);

    const handleCreate = async () => {
        // ovdje su ti već vrijednosti iz inputa
        await api.post(`sections`, {
            name: name,
            description: description
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
            <TitleContainer title={id?"Ažuriraj sekciju":"Nova sekcija"} description={id?"Promijeni podatke o sekciji":"Dodavanje nove sekcije"} />

            <TextField
                label="Naziv"
                value={name}
                onChange={e => setName(e.target.value)}
                style={{ width: "90%", margin: "10px 0" }}
            />

            <TextField
                label="Kratki opis"
                value={description}
                onChange={e => setDescription(e.target.value)}
                style={{ width: "90%", margin: "10px 0" }}
            />

            <Button
                variant="contained"
                color="primary"
                style={{ width: "90%", margin: "10px 0" }}
                onClick={handleCreate}
            >
                {id?"Ažuriraj":"Stvori"} sekciju
            </Button>
        </div>
    );
};

export default AddSection;