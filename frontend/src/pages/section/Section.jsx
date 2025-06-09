import React from "react";
import "./Section.css"
import { useState, useEffect } from "react";
import TitleContainer from "../../components/titleContainer/TitleContainer";
import {useNavigate, useParams} from "react-router-dom";
import api from "../../api";

const Section = () => {
    const [isJoined, setIsJoined] = useState(false);
    const [detailedSection, setDetailedSection] = useState({});
    const nav = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        async function fetchData() {
            await api.get(`/sections/${id}`)
                .then(response => {
                    setDetailedSection(response.data);
                })
                .catch(error => {
                    console.log("Section error: ", error)
                })
        }
        fetchData();
    }, [id]);

    const handleClick = () => {
        nav("/profile")
    };

    return (
        <div className="container">
            <TitleContainer title={detailedSection.name} description={"Info o sekciji"}/>
            <div className="aboutText">
                { detailedSection.descriptionUrl }
            </div>
            <div id="enroll-button-container">
                <button id="enroll-button-green" onClick={()=>handleClick()} disabled={!isJoined} style={isJoined?{backgroundColor:"lightgrey"}:{}}>
                    <p id="enroll-button-text">
                        {isJoined? "Already joined":"Join now"}
                    </p>
                </button>
            </div>
        </div>
    );
}

export default Section;