import React, {useEffect, useState} from 'react';
import { Button, TextField, MenuItem, Select, InputLabel, FormControl, Autocomplete } from '@mui/material';
import TitleContainer from '../../../components/titleContainer/TitleContainer';
import api from "../../../api";
import {useSection} from "../../../contexts/SectionProvider";
import {useParams} from "react-router-dom";

const ManualPoints = () => {
    const {eventId, memberId} = useParams();
    const {sectionId} = useSection();
    const [events, setEvents] = useState([]);
    const [members, setMembers] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState('');
    const [selectedMember, setSelectedMember] = useState(null);

    useEffect(() => {
        async function fetchData() {
            await api.get(`sections/${sectionId}/event`)
                .then(response => {
                    const newEvents = response.data.map(event => ({
                        ...event,
                        label: `${event.name} ${event.date}`
                    }))
                    setEvents(newEvents);
                    const selected = newEvents.filter(event => event.id===parseInt(eventId))[0];

                    setSelectedEvent(selected);
                    return api.get(`sections/${sectionId}/members`)
                })
                .then(response => {
                    const newMembers = response.data.map(member => ({
                        ...member,
                        id: member.memberId,
                        label: `${member.firstName} ${member.lastName} ${member.jmbag}`
                    }));
                    const selected = newMembers.filter(member => member.id===parseInt(memberId))[0];
                    setSelectedMember(selected?selected:null);
                    setMembers(newMembers);
                })
                .catch(error => {
                    console.log("Error fetching data ", error);
                });
        }

        fetchData();
    }, [sectionId, eventId, memberId]);

    const handleSubmit = async () => {
        const requestData = {
            memberId: selectedMember.id,
            eventId: selectedEvent.id
        };

        await api.post(`sections/${sectionId}/participations`, requestData)
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

                    <FormControl style={{width: "90%", margin: "10px 0px"}}>
                        <Autocomplete
                            slotProps={{
                                popper: {
                                    sx: {
                                        '& .MuiAutocomplete-option': { fontSize: 16, minHeight: 'unset' },
                                    },
                                },
                            }}
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
