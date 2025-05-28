import React, { useState } from 'react';
import TitleContainer from "../../../components/titleContainer/TitleContainer";
import {
    Checkbox,
    FormControlLabel,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Input, FormHelperText
} from "@mui/material";
import api from "../../../api";
import {useSection} from "../../../contexts/SectionProvider";
import {log} from "qrcode/lib/core/galois-field";

const PassUsers = () => {
    const { sectionId } = useSection();

    const [members,  setMembers]  = useState([]);
    const [threshold, setThreshold]  = useState(1000);


    const handleCreate = async () => {
        await api.get(`sections/${sectionId}/participations/pass/${threshold}`)
            .then(response => {
                console.log(response.data);
                setMembers(response.data);
            })
            .catch(error => {
                console.error("Error calculating data: ", error);
            })
        setMembers([''])

    }

    return (
        <div className='container'>
            <TitleContainer title={"Novi event"} description={"Dodavanje novih evenata"} />


            <FormControl style={{width: "90%", margin: "10px 0px"}}>
                <InputLabel id="threshold-label">Odaberi prag</InputLabel>
                <Input id="threshold-input" variant="outlined" value={threshold} onChange={(e) => {
                    if (parseInt(e.target.value)) {
                        setThreshold(parseInt(e.target.value));
                    } else {
                        setThreshold(0);
                    }
                }}/>
                <FormHelperText>Broj bodova potrebnih za prolaz</FormHelperText>
            </FormControl>

            <Button
                variant="contained"
                color="primary"
                style={{ width: "90%", margin: "10px 0" }}
                onClick={handleCreate}
            >
                Izračunaj
            </Button>

            {members && members.length>0 && (
                <>
                    <br/>
                    <br/>
                    <div>
                        Broj osoba koje su prošle: {members.length}
                    </div>
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ width: "90%", margin: "10px 0" }}
                        onClick={handleCreate}
                    >
                        Preuzmi excel tablicu
                    </Button>
                </>
            )}
        </div>
    );
};

export default PassUsers;