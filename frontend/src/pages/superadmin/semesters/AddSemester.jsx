import {useEffect, useState} from 'react';
import TitleContainer from "../../../components/titleContainer/TitleContainer";
import {Checkbox, FormControlLabel, TextField, Button} from "@mui/material";
import api from "../../../api";
import {useSection} from "../../../contexts/SectionProvider";
import {log} from "qrcode/lib/core/galois-field";
import {useParams} from "react-router-dom";

const AddSemester = () => {
    const {id} = useParams();
    const { sectionId } = useSection();

    // state varijable za svaki input
    const [name, setName] = useState('');
    const [dateFrom,  setDateFrom]  = useState('');
    const [dateTo,  setDateTo]  = useState('');

    useEffect(() => {
        async function fetchData() {
            const semester = { id: 1, name: "Proljetni semestar 2025", dateFrom: "2025-02-01", dateTo: "2025-06-30" }
            setName(semester.name);
            setDateTo(semester.dateTo);
            setDateFrom(semester.dateFrom);
            /*await api.get(`/semesters/${id}`)
                .then(response => {
                    setName(response.data.name);
                    setDateFrom(response.data.dateFrom);
                    setDateTo(response.data.dateTo);
                })
                .catch(error => {
                    console.log("Error fetching data: ", error);
                })*/
        }
        if (id) fetchData();
    }, []);

    const handleCreate = async () => {
        // ovdje su ti već vrijednosti iz inputa
        await api.post(`sections/${sectionId}/event`, {
            name: name,
            dateFrom: dateFrom,
            dateTo: dateTo,
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
            <TitleContainer title={id?"Ažuriraj semestar":"Novi semestar"} description={"Dodavanje novog semestra"} />

            <div>
                Naziv staviti u formatu "23/24 ZS" ili "25/26 LJS"
            </div>
            <TextField
                label="Naziv"
                value={name}
                onChange={e => setName(e.target.value)}
                style={{ width: "90%", margin: "10px 0" }}
            />

            <TextField
                label="Datum početka"
                type="date"
                value={dateFrom}
                onChange={e => setDateFrom(e.target.value)}
                style={{ width: "90%", margin: "10px 0" }}
            />

            <TextField
                label="Datum kraja"
                type="date"
                value={dateTo}
                onChange={e => setDateTo(e.target.value)}
                style={{ width: "90%", margin: "10px 0" }}
            />

            <Button
                variant="contained"
                color="primary"
                style={{ width: "90%", margin: "10px 0" }}
                onClick={handleCreate}
            >
                {id?"Update":"Create"} Semester
            </Button>
        </div>
    );
};

export default AddSemester;