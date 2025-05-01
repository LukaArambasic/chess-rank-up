import React from "react";
import { useNavigate } from "react-router-dom";
import TitleContainer from "../../../components/titleContainer/TitleContainer";
import Button from "../../../components/button/Button";

const SemestersOptions = () => {
    const nav = useNavigate();
    const timeScales = [
        {id: 1, name: "Dodaj semestar", to:"add"},
        {id: 2, name: "Svi semestri", to:"all"},
    ]

    const handleClick = (time) => {
        nav(`${(time.to)}`)
    }

    return (
        <>
            <div className="container">
                <TitleContainer title={"Admin Semestar"} description={"Odaberi što želiš napraviti"}/>

                <div className="buttonList">
                    {timeScales.map(time => (
                        <Button key={time.id} item={time} onClick={handleClick}/>
                    ))}
                </div>
            </div>
        </>
    );
}

export default SemestersOptions;