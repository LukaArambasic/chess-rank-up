import {useEffect, useState} from 'react';
import TitleContainer from "../../../components/titleContainer/TitleContainer";
import {TextField, Button} from "@mui/material";
import api from "../../../api";
import {useParams} from "react-router-dom";

const AddSemester = () => {
    const {id} = useParams();

    // state varijable za svaki input
    const [name, setName] = useState('');
    const [dateFrom,  setDateFrom]  = useState('');
    const [dateTo,  setDateTo]  = useState('');

    useEffect(() => {
        async function fetchData() {
            await api.get(`/semesters/${id}`)
                .then(response => {
                    setName(response.data.name);
                    setDateFrom(response.data.dateFrom);
                    setDateTo(response.data.dateTo);
                })
                .catch(error => {
                    console.log("Error fetching data: ", error);
                });
        }
        if (id) fetchData();
    }, [id]);

    const handleCreate = async () => {
        // ovdje su ti već vrijednosti iz inputa
        await api.post(id?`semesters/${id}`:`semesters`, {
            name: name,
            dateFrom: dateFrom,
            dateTo: dateTo,
        })
            .catch(error => {
                console.log("Error creating new semester: ", error)
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