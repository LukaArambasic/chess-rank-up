import React, { useEffect, useState } from "react";
import TitleContainer from "../../components/titleContainer/TitleContainer";
import JoinButton from "../../components/button-join/JoinButton";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import {useAuth} from "../../contexts/AuthProvider";
import {useSection} from "../../contexts/SectionProvider";

const Join = () => {
    const [sections, setSections] = useState([]);
    const nav = useNavigate();
    const {user} = useAuth();
    const {setSection} = useSection();

    useEffect(() => {
        async function fetchData() {
            let functionSections = [];
            await api.get("sections")
                .then(response => {
                    //setSections(response.data);
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
    }, [user.id]);

    const handleSectionClick = (id) => {
        nav(`/section/${id}`)
    };

    const handleJoinClick = async (id) => {
        const data = {
            "jmbag": user.jmbag,
            "rankName": "Pijun"
        }
        console.log("this is user jmbag: ", data);
        await api.post(`sections/${id}/members`, data)
            .then(_ => {
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