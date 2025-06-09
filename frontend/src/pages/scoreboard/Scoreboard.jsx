import React, {useEffect, useState} from "react";
import'./Scoreboard2.css';
import RankOrder from "../../components/rank-order/RankOrder";
import TitleContainer from "../../components/titleContainer/TitleContainer";
import api from "../../api";
import {useSection} from "../../contexts/SectionProvider";

const Scoreboard = ({name, description}) => {
    const {sectionId} = useSection();
    const [scoreboard, setScoreboard] = useState([]);

    useEffect(() => {
        async function fetchData() {
            await api.get(`/sections/${sectionId}/scoreboard/${name.toLowerCase()}`)
                .then(response => {
                    console.log(response.data);
                    setScoreboard(response.data);
                    //return api.get(`/sections/${sectionId}/participations/check-points/${6}`);
                })
                .catch(error => {
                    console.log("Error fetching data: ", error);
                });
        }
        fetchData();
    }, [name, sectionId]);

    return (
        <>
            <div className="container">
                <TitleContainer title={`Scoreboard ${name}`} description={description}/>
                    {scoreboard.map((member, index) => (
                        <RankOrder key={index} mjesto={member} place={index+1} />
                    ))}
            </div>
        </>
    );
}

export default Scoreboard;