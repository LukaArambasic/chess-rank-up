import React, {useEffect, useState} from 'react';
import {Button, MenuItem, Select, InputLabel, FormControl, Autocomplete, TextField} from '@mui/material';
import TitleContainer from '../../../components/titleContainer/TitleContainer';
import {useSection} from "../../../contexts/SectionProvider";
import api from "../../../api";
import InfoAccordion from "../../../components/info-accordion/InfoAccordion";

const AutomaticPoints = () => {
    const {sectionId} = useSection();
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [uploadError, setUploadError] = useState('');

    useEffect(() => {
        async function fetchData() {
            await api.get(`sections/${sectionId}/event`)
                .then(response => {
                    const newEvents = response.data.map(event => ({
                        ...event,
                        label: `${event.name} ${event.date}`
                    }))
                    setEvents(newEvents);
                    return api.get(`sections/${sectionId}/members`)
                })
                .catch(error => {
                    console.log("Error fetching data ", error);
                })
        }

        fetchData();
    }, [sectionId]);

    const handleEventChange = (e) => {
        setSelectedEvent(e.target.value);
        setUploadError('');
    };


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setFileName(file.name);
            setUploadError('');
        }
    };

    const handleSubmit = async () => {
        if (!selectedEvent) {
            setUploadError('Molimo odaberite događaj.');
            return;
        }
        if (!selectedFile) {
            setUploadError('Molimo uploadajte CSV ili TXT file.');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('eventId', selectedEvent.id);

        try {
            await api.post(
                `sections/${sectionId}/participations/auto/${selectedEvent.id}`,
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );
            // uspjeh
        } catch (error) {
            console.error('Error uploading file:', error);
            setUploadError('Došlo je do pogreške pri uploadu.');
        }
    };


    return (
    <div className='container'>
        <TitleContainer title={"Unos bodova"} description={"Unesi bodove za određeni event"} />

        <InfoAccordion
            text1={"Stranica za automatski unos bodova. Ovdje je potrebno odabrati događanje i datoteku tipa .txt ili .csv s JMBAG-om svih studenata koji su bili prisutni na tom događanju."}
            text2={"Aplikacija 'QR Skener' pamti što je skenirala. Iz nje možete preuzeti .txt i .csv datoteke.  "}
        />


        <FormControl style={{width: "90%", margin: "10px 0px"}}>
            <Autocomplete
                slotProps={{
                    popper: {
                        sx: {
                            '& .MuiAutocomplete-option': { fontSize: 16, minHeight: 'unset' },
                        },
                    },
                }}
                value={selectedEvent}
                onChange={(e, newValue) => setSelectedEvent(newValue)}
                options={events}
                renderInput={(params) => <TextField {...params} label="Odaberi događaj" />}
            />
        </FormControl>

        <FormControl style={{width:"90%", margin: "10px 0px"}}>
            <Button variant="outlined" component="label">
                Upload file
                <input type="file" hidden onChange={handleFileChange}/>
            </Button>
        </FormControl>
        <div style={{alignSelf: "start", padding:"0 10%"}}>
            {fileName && (
                <>"{fileName}" učitan</>
            )}
        </div>

        <div style={{alignSelf: "start", padding:"0 10%", color: "darkred"}}>
            {uploadError}
        </div>

      <Button variant="contained" color="primary" style={{width:"90%", margin: "10px 0px"}} onClick={handleSubmit}>Submit</Button>
    </div>
  );
};

export default AutomaticPoints;
