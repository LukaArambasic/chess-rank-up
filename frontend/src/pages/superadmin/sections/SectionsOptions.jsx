import React from "react";
import { useNavigate } from "react-router-dom";
import TitleContainer from "../../../components/titleContainer/TitleContainer";
import Button from "../../../components/button/Button";

const SectionsOptions = () => {
    const nav = useNavigate();
    const timeScales = [
        {id: 1, name: "Dodaj sekciju", to:"add"},
        {id: 2, name: "Sve sekcije", to:"all"},
    ]

    const handleClick = (time) => {
        nav(`${(time.to)}`)
    }

    return (
        <>
            <div className="container">
                <TitleContainer title={"Admin Sekcija"} description={"Odaberi što želiš napraviti"}/>

                <div className="buttonList">
                    {timeScales.map(time => (
                        <Button key={time.id} item={time} onClick={handleClick}/>
                    ))}
                </div>
            </div>
        </>
    );
}

export default SectionsOptions;