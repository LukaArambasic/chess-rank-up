import {useState} from 'react';
import TitleContainer from "../../../components/titleContainer/TitleContainer";
import {TextField, Button} from "@mui/material";
import api from "../../../api";
import {useSection} from "../../../contexts/SectionProvider";

const AddEvent = () => {
    const { sectionId } = useSection();

    // state varijable za svaki input
    const [name, setName] = useState('');
    const [date,  setDate]  = useState(new Date(Date.now()).toISOString().split('T')[0]);
    const [points,setPoints]= useState(1);

    const handleCreate = async () => {
        // ovdje su ti već vrijednosti iz inputa
        await api.post(`sections/${sectionId}/event`, {
            name: name,
            date: date,
            idEventType: points<=0?1:points>6?6:points,
            description: "Fake.",
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
                type="number"
                label="Broj bodova (1-6)"
                value={points}
                onChange={e => {
                    const int = parseInt(e.target.value);
                    if (isNaN(int)) {
                        setPoints(0)
                    } else {
                        setPoints(int);
                    }

                }}
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