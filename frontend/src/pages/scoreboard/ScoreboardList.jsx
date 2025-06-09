import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import TitleContainer from "../../components/titleContainer/TitleContainer";

const ScoreboardList = () => {
    const nav = useNavigate();
    const timeScales = [
        {id: 1, name: "Semestar", to:"semester"},
        {id: 2, name: "Godina", to:"year"},
        {id: 3, name: "Ukupno", to:"total"},
        
    ]

    const handleClick = (time) => {
        nav(`${(time.to)}`)
    }
    
    return (
        <>
           <div className="container">
                <TitleContainer title={"Scoreboard List"} description={"Izaberi rezultate koje želiš prikazati"}/>
                
                <div className="buttonList">
                    {timeScales.map(time => (
                        <Button key={time.id} item={time} onClick={handleClick}/>
                    ))}
                </div>
            </div>
        </>
    );
}

export default ScoreboardList;