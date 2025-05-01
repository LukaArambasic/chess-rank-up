import React, {useEffect, useState} from 'react';
import './EnrolledSections.css';
import TitleContainer from '../../components/titleContainer/TitleContainer';
import Button from '../../components/button/Button';
import { useNavigate } from 'react-router-dom';
import api from "../../api";
import {useAuth} from "../../contexts/AuthProvider";
import {useSection} from "../../contexts/SectionProvider";

const EnrolledSections = () => {
    const {user} = useAuth();
    const {setSection} = useSection();
    const [selectedSection, setSelectedSection] = useState(null);
    const nav = useNavigate();
    const [mySections, setMySections] = useState([]);


    useEffect(() => {
        async function fetchData() {
            await api.get(`members/${user.id}/sections`).then(response => {
                setMySections(response.data);
            }).catch(error => {
                console.log("Error: ", error);
            })
        }
        fetchData();
    }, []);

    const handleSectionClick = (section) => {
        let role = "user";
        let navPath = "/profile";
        if (section.rank==="Kralj") {
            role="admin";
            navPath="/admin";
        }
        setSection(section.id,role);
        nav(navPath);
    };

    return (
        <div className="container">
            <TitleContainer title={"Moje sekcije"} description={""} />
            <div className="buttonList">
                {mySections && mySections.map((section) => (
                    <Button key={section.id} item={section} onClick={handleSectionClick}/>
                ))}
            </div>
        </div>
    );
};

export default EnrolledSections;
