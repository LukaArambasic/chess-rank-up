import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import TableRow from '../../components/table-row/TableRow';
import './Activity.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {useSection} from "../../contexts/SectionProvider";
import {useAuth} from "../../contexts/AuthProvider";
import api from "../../api";


const Activity = () => {
    const {sectionId} = useSection();
    const {user} = useAuth();
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        async function fetchData() {
            await api.get(`sections/${sectionId}/members/${user.id}/profile/activities`)
                .then(response => {
                    setActivities(response.data.events);
                })
                .catch(error => {
                    console.log("Error: ", error);
                })
        }
        fetchData();
    }, []);

    return (
            <div className='container2'>
                <div id='backIcon'>
                    <Link to="/profile"><FontAwesomeIcon icon={faArrowLeft} /></Link>
                </div>

                <div id='title'>Ime Prezime</div>

                <div className='table'>
                    <div className='maleniHeader1'>Datum</div>
                    <div className='maleniHeader2'>Aktivnost</div>
                    <div className='maleniHeader3'>Bodovi</div>
                </div>

                {activities && activities.map((activity, index) => (
                    <TableRow key={index} event={activity} />
                ))}
            </div>
    );
};

export default Activity;
