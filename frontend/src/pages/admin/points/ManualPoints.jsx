import React, {useEffect, useState} from 'react';
import { Button, TextField, MenuItem, Select, InputLabel, FormControl, Autocomplete } from '@mui/material';
import TitleContainer from '../../../components/titleContainer/TitleContainer';
import api from "../../../api";
import {useSection} from "../../../contexts/SectionProvider";
import {useParams} from "react-router-dom";

const ManualPoints = () => {
    const {id} = useParams();
    const {sectionId} = useSection();
    const [events, setEvents] = useState([]);
    const [members, setMembers] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState('');
    const [selectedMember, setSelectedMember] = useState(null);

    useEffect(() => {
        async function fetchData() {
            await api.get(`sections/${sectionId}/event`)
                .then(response => {
                    setEvents(response.data);
                    setSelectedEvent(response.data.filter(event => event.id===parseInt(id))[0]);
                    return api.get(`sections/${sectionId}/members`)
                })
                .then(response => {
                    const newMembers = response.data.map(member => ({
                        ...member,
                        id: member.memberId,
                        label: `${member.firstName} ${member.lastName} ${member.jmbag}`
                    }));
                    setMembers(newMembers);
                })
                .catch(error => {
                    console.log("Error fetching data ", error);
                });
        }

        fetchData();
    }, [sectionId]);

    const handleSubmit = async () => {
        // TODO: implement logic
        const requestData = {
            memberId: selectedMember.id,
            eventId: selectedEvent.id
        };
        console.log(requestData);

        await api.post(`sections/${sectionId}/participations`, requestData)
            .then(response => {
                console.log("Response.data: ", response.data);
            })
            .catch(error => {
                console.error("Error creating data: ", error);
            })
    };

    return (
        <div className='container'>
            {events && events.length && (
                <>
                    <TitleContainer title={"Unos bodova"} description={"Unesi bodove za određeni event"} />

                    <FormControl style={{width: "90%", margin: "10px 0px"}}>
                        <InputLabel id="event-label">Odaberi događaj</InputLabel>
                        <Select
                            labelId="event-label"
                            value={selectedEvent}
                            onChange={(e) => setSelectedEvent(e.target.value)}
                            label="Odaberi događaj"
                        >
                            {events.map(event => (
                                <MenuItem key={event.id} value={event}>{event.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl style={{width: "90%", margin: "10px 0px"}}>
                        <Autocomplete
                            value={selectedMember}
                            onChange={(e, newValue) => setSelectedMember(newValue)}
                            options={members}
                            renderInput={(params) => <TextField {...params} label="Odaberi osobu" />}
                        />
                    </FormControl>


                    <Button
                        variant="contained"
                        color="primary"
                        style={{width: "90%", margin: "10px 0px"}}
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </>
            )}
        </div>
    );
};

export default ManualPoints;
