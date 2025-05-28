import React, {useEffect, useState} from 'react';
import { Button, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import TitleContainer from '../../../components/titleContainer/TitleContainer';
import {useSection} from "../../../contexts/SectionProvider";
import api from "../../../api";

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
                    setEvents(response.data);
                    return api.get(`sections/${sectionId}/members`)
                })
                .catch(error => {
                    console.log("Error fetching data ", error);
                })
        }

        fetchData();
    }, []);

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
        formData.append('eventId', selectedEvent);

        console.log(selectedEvent);
        console.log(selectedFile);

        try {
            await api.post(
                `sections/${sectionId}/participations/auto/${selectedEvent}`,
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

        <FormControl style={{width:"90%", margin: "10px 0px"}}>
            <InputLabel id="event-label">Odaberi događaj</InputLabel>
            <Select label="Odaberi događaj" defaultValue="" onChange={handleEventChange}>
                {events.map(event => {
                    return (
                        <MenuItem key={event.id} value={event.id}>{event.name}</MenuItem>
                    )
                })}
            </Select>
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
