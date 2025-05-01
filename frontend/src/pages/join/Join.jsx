import React, { useEffect, useState } from "react";
import TitleContainer from "../../components/titleContainer/TitleContainer";
import JoinButton from "../../components/button-join/JoinButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../../api";
import {useAuth} from "../../contexts/AuthProvider";
import {log} from "qrcode/lib/core/galois-field";
import {useSection} from "../../contexts/SectionProvider";

const Join = () => {
    const [sections, setSections] = useState([]);
    const nav = useNavigate();
    const {user} = useAuth();
    const {setSection} = useSection();

    useEffect(() => {
        // TODO: Add axios to fetch sections from an API
        // Example: axios.get('/api/sections').then(response => setSections(response.data));
        async function fetchData() {
            let functionSections = [];
            await api.get("sections")
                .then(response => {
                    setSections(response.data);
                    functionSections = response.data;
                    return api.get(`members/${user.id}/sections`)
                })
                .then(response => {
                    const mySectionIds = response.data.map(section => section.id);
                    const updatedSections = functionSections.map(section => ({
                        ...section,
                        enrolled: mySectionIds.includes(section.id)
                    }));
                    setSections(updatedSections);
                })
                .catch(error => {
                    console.log("Error happened: ", error);
                })
        }
        fetchData();
    }, []);

    const handleSectionClick = (id) => {
        nav(`/section/${id}`)
    };

    const handleJoinClick = async (id) => {
        // TODO: Handle what happens when a section is clicked
        console.log(`Section clicked:`, {rankName: "Pijun", jmbag: user.jmbag});
        await api.post(`sections/${id}/members`, {rankName: "Pijun", jmbag: user.jmbag})
            .then(response => {
                console.log("Added section successfully!", response.data);
                setSection(id, "user");
                nav(`/profile`);
            })
            .catch(error => {
                console.log("Error adding section: ", error);
            })
    };

    return (
        <div className="container">
            <TitleContainer title={"Dobrodošli!"} description={"Izaberi sekciju u koju se želite učlaniti"} />
            <div className="buttonList buttonList2">
                {sections.map((section) => (
                    <JoinButton key={section.id} item={section} onClick={handleSectionClick} onJoinClick={handleJoinClick} />
                ))}
            </div>
        </div>
    );
};

export default Join;